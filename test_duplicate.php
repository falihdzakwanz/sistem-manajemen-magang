<?php

use App\Models\User;

// Test untuk memastikan nim dan email bisa duplikat
echo "Testing duplicate NIM and Email...\n";

try {
    // Buat user pertama
    $user1 = User::create([
        'nama' => 'Test User 1',
        'nim' => '12345678',
        'universitas' => 'Universitas Test',
        'jurusan' => 'Teknik Informatika',
        'email' => 'test@example.com',
        'telepon' => '08123456789',
        'tanggal_daftar' => '2025-01-01',
        'tanggal_mulai' => '2025-02-01',
        'tanggal_selesai' => '2025-04-01',
        'status' => 'Menunggu',
        'bidang_id' => 1,
        'motivasi' => 'Test motivasi'
    ]);
    
    echo "User 1 created successfully\n";
    
    // Buat user kedua dengan nim dan email yang sama
    $user2 = User::create([
        'nama' => 'Test User 2',
        'nim' => '12345678', // NIM sama
        'universitas' => 'Universitas Test 2',
        'jurusan' => 'Sistem Informasi',
        'email' => 'test@example.com', // Email sama
        'telepon' => '08987654321',
        'tanggal_daftar' => '2025-01-02',
        'tanggal_mulai' => '2025-03-01',
        'tanggal_selesai' => '2025-05-01',
        'status' => 'Menunggu',
        'bidang_id' => 1,
        'motivasi' => 'Test motivasi 2'
    ]);
    
    echo "User 2 created successfully with duplicate NIM and Email\n";
    echo "SUCCESS: Duplicate NIM and Email are now allowed!\n";
    
    // Hapus test data
    $user1->delete();
    $user2->delete();
    echo "Test data cleaned up\n";
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
