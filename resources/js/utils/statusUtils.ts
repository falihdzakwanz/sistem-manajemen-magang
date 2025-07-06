/**
 * Utility functions untuk status magang
 */

// Type definition untuk status yang valid
export type StatusMagang = 'Menunggu' | 'Diterima' | 'Ditolak' | 'Sedang Magang' | 'Selesai Magang';

/**
 * Mendapatkan kelas CSS untuk warna status berdasarkan status magang
 * @param status - Status magang yang valid
 * @returns String kelas CSS untuk styling badge status
 */
export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'Diterima':
            return 'bg-green-100 text-green-800';
        case 'Menunggu':
            return 'bg-yellow-100 text-yellow-800';
        case 'Selesai Magang':
            return 'bg-blue-100 text-blue-800';
        case 'Ditolak':
            return 'bg-red-100 text-red-800';
        case 'Sedang Magang':
            return 'bg-purple-100 text-purple-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

/**
 * Mendapatkan label yang user-friendly untuk status
 * @param status - Status magang
 * @returns Label yang lebih deskriptif untuk ditampilkan
 */
export const getStatusLabel = (status: string): string => {
    switch (status) {
        case 'Diterima':
            return 'Diterima';
        case 'Menunggu':
            return 'Menunggu Review';
        case 'Selesai Magang':
            return 'Selesai';
        case 'Ditolak':
            return 'Ditolak';
        case 'Sedang Magang':
            return 'Sedang Aktif';
        default:
            return status;
    }
};

/**
 * Mendapatkan emoji icon untuk status
 * @param status - Status magang
 * @returns Emoji yang sesuai dengan status
 */
export const getStatusIcon = (status: string): string => {
    switch (status) {
        case 'Diterima':
            return '✅';
        case 'Menunggu':
            return '⏳';
        case 'Selesai Magang':
            return '🎓';
        case 'Ditolak':
            return '❌';
        case 'Sedang Magang':
            return '💼';
        default:
            return '📋';
    }
};

/**
 * Mendapatkan deskripsi untuk setiap status
 * @param status - Status magang
 * @returns Deskripsi yang menjelaskan status
 */
export const getStatusDescription = (status: string): string => {
    switch (status) {
        case 'Diterima':
            return 'Pendaftaran telah diterima dan siap memulai magang';
        case 'Menunggu':
            return 'Sedang dalam proses review dan evaluasi';
        case 'Selesai Magang':
            return 'Telah menyelesaikan program magang dengan baik';
        case 'Ditolak':
            return 'Pendaftaran tidak memenuhi persyaratan';
        case 'Sedang Magang':
            return 'Sedang menjalani program magang aktif';
        default:
            return 'Status tidak dikenal';
    }
};

/**
 * Daftar semua status yang valid dengan informasi lengkap
 */
export const STATUS_OPTIONS = [
    {
        value: 'Menunggu',
        label: 'Menunggu',
        color: getStatusColor('Menunggu'),
        icon: getStatusIcon('Menunggu'),
        description: getStatusDescription('Menunggu'),
    },
    {
        value: 'Diterima',
        label: 'Diterima',
        color: getStatusColor('Diterima'),
        icon: getStatusIcon('Diterima'),
        description: getStatusDescription('Diterima'),
    },
    {
        value: 'Ditolak',
        label: 'Ditolak',
        color: getStatusColor('Ditolak'),
        icon: getStatusIcon('Ditolak'),
        description: getStatusDescription('Ditolak'),
    },
    {
        value: 'Sedang Magang',
        label: 'Sedang Magang',
        color: getStatusColor('Sedang Magang'),
        icon: getStatusIcon('Sedang Magang'),
        description: getStatusDescription('Sedang Magang'),
    },
    {
        value: 'Selesai Magang',
        label: 'Selesai Magang',
        color: getStatusColor('Selesai Magang'),
        icon: getStatusIcon('Selesai Magang'),
        description: getStatusDescription('Selesai Magang'),
    },
] as const;

/**
 * Status yang ditampilkan di halaman Status Pendaftaran
 */
export const ALLOWED_STATUS_PENDAFTARAN: StatusMagang[] = ['Menunggu', 'Diterima', 'Ditolak'];

/**
 * Status yang ditampilkan di halaman Data Mahasiswa
 */
export const ALLOWED_STATUS_MAHASISWA: StatusMagang[] = ['Sedang Magang', 'Selesai Magang'];
