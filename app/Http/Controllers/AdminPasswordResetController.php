<?php

namespace App\Http\Controllers;

use App\Mail\AdminPasswordResetMail;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Carbon\Carbon;

class AdminPasswordResetController extends Controller
{
    /**
     * Show the forgot password form
     */
    public function showForgotPasswordForm(): Response
    {
        // Ambil semua admin untuk dropdown
        $admins = Admin::select('id', 'name', 'username', 'email')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/ForgotPassword', [
            'admins' => $admins
        ]);
    }

    /**
     * Send password reset link to admin email
     */
    public function sendResetLinkEmail(Request $request): RedirectResponse
    {
        // Validasi admin_id yang dipilih
        $request->validate([
            'admin_id' => 'required|exists:users,id'
        ]);

        // Ambil admin yang dipilih berdasarkan admin_id
        $admin = Admin::findOrFail($request->input('admin_id'));

        // Generate token
        $token = Str::random(64);

        // Delete existing tokens for this email
        DB::table('admin_password_reset_tokens')->where('email', $admin->email)->delete();

        // Insert new token
        DB::table('admin_password_reset_tokens')->insert([
            'email' => $admin->email,
            'token' => Hash::make($token),
            'created_at' => Carbon::now()
        ]);

        // Send email
        try {
            Mail::to($admin->email)->send(new AdminPasswordResetMail($token, $admin->email));

            return redirect()->back()->with(
                'status',
                "✅ Link reset password & username telah dikirim ke email {$admin->name} ({$admin->email}). Silakan cek email dan ikuti instruksi yang diberikan."
            );
        } catch (\Exception $e) {
            return redirect()->back()->with(
                'error',
                "❌ Gagal mengirim email reset password ke {$admin->name}. Silakan coba lagi atau hubungi administrator."
            );
        }
    }

    /**
     * Show the reset password form
     */
    public function showResetPasswordForm(Request $request, $token = null): Response|RedirectResponse
    {
        // Get token from path parameter or query parameter
        $token = $token ?? $request->get('token');
        $email = $request->get('email');

        if (!$token || !$email) {
            return redirect()->route('login')->with(
                'error',
                'Link reset password tidak valid atau telah kedaluwarsa.'
            );
        }

        // Check if token exists and is valid (not expired)
        $resetToken = DB::table('admin_password_reset_tokens')
            ->where('email', $email)
            ->first();

        if (!$resetToken) {
            return redirect()->route('login')->with(
                'error',
                'Token reset password tidak ditemukan atau telah kedaluwarsa.'
            );
        }

        // Check if token is expired (60 minutes)
        $tokenAge = Carbon::parse($resetToken->created_at)->diffInMinutes(Carbon::now());
        if ($tokenAge > 60) {
            // Delete expired token
            DB::table('admin_password_reset_tokens')->where('email', $email)->delete();

            return redirect()->route('login')->with(
                'error',
                'Token reset password telah kedaluwarsa. Silakan buat permintaan reset password baru.'
            );
        }

        // Verify token
        if (!Hash::check($token, $resetToken->token)) {
            return redirect()->route('login')->with(
                'error',
                'Token reset password tidak valid.'
            );
        }

        // Get current admin data to show current username
        $admin = Admin::where('email', $email)->first();

        return Inertia::render('admin/ResetPassword', [
            'token' => $token,
            'email' => $email,
            'currentUsername' => $admin ? $admin->username : null
        ]);
    }

    /**
     * Reset the admin password
     */
    public function resetPassword(Request $request): RedirectResponse
    {
        // First validate basic required fields
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required'
        ]);

        // Get the email and admin for username validation
        $email = $request->input('email');
        $existingAdmin = Admin::where('email', $email)->first();

        // Validate username separately with proper admin id
        $request->validate([
            'username' => [
                'required',
                'string',
                'min:3',
                'max:50',
                'unique:users,username,' . ($existingAdmin ? $existingAdmin->getKey() : 'NULL')
            ]
        ], [
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.exists' => 'Email tidak terdaftar sebagai admin',
            'username.required' => 'Username wajib diisi',
            'username.min' => 'Username minimal 3 karakter',
            'username.max' => 'Username maksimal 50 karakter',
            'username.unique' => 'Username sudah digunakan',
            'password.required' => 'Password wajib diisi',
            'password.min' => 'Password minimal 8 karakter',
            'password.confirmed' => 'Konfirmasi password tidak cocok',
            'password_confirmation.required' => 'Konfirmasi password wajib diisi'
        ]);

        // Check if token exists and is valid
        $resetToken = DB::table('admin_password_reset_tokens')
            ->where('email', $request->input('email'))
            ->first();

        if (!$resetToken) {
            return redirect()->route('login')->with(
                'error',
                'Token reset password tidak ditemukan atau telah kedaluwarsa.'
            );
        }

        // Check if token is expired (60 minutes)
        $tokenAge = Carbon::parse($resetToken->created_at)->diffInMinutes(Carbon::now());
        if ($tokenAge > 60) {
            // Delete expired token
            DB::table('admin_password_reset_tokens')->where('email', $request->input('email'))->delete();

            return redirect()->route('login')->with(
                'error',
                'Token reset password telah kedaluwarsa. Silakan buat permintaan reset password baru.'
            );
        }

        // Verify token
        if (!Hash::check($request->input('token'), $resetToken->token)) {
            return redirect()->route('login')->with(
                'error',
                'Token reset password tidak valid.'
            );
        }

        // Update admin password and username
        $admin = Admin::where('email', $request->input('email'))->first();
        $admin->username = $request->input('username');
        $admin->password = Hash::make($request->input('password'));
        $admin->save();

        // Delete the used token
        DB::table('admin_password_reset_tokens')->where('email', $request->input('email'))->delete();

        return redirect()->route('login')->with(
            'success',
            '🎉 Password dan Username berhasil diperbarui! Silakan login dengan kredensial baru Anda.'
        );
    }
}
