<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class StatusMagangNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $mahasiswa;
    public $status;
    public $rejectReason;

    /**
     * Create a new message instance.
     */
    public function __construct(User $mahasiswa, string $status, ?string $rejectReason = null)
    {
        $this->mahasiswa = $mahasiswa;
        $this->status = $status;
        $this->rejectReason = $rejectReason;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $subject = $this->status === 'Diterima' 
            ? 'Selamat! Pendaftaran Magang Anda Diterima - Kominfo'
            : 'Pemberitahuan Status Pendaftaran Magang - Kominfo';

        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $view = $this->status === 'Diterima' 
            ? 'emails.status-diterima'
            : 'emails.status-ditolak';

        return new Content(
            view: $view,
            with: [
                'mahasiswa' => $this->mahasiswa,
                'status' => $this->status,
                'rejectReason' => $this->rejectReason,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
