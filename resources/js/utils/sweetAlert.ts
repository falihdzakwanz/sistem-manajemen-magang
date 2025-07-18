import Swal from 'sweetalert2';

// Konfigurasi default untuk toast notifications
const toastConfig = {
    toast: true,
    position: 'top-end' as const,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast: HTMLElement) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
};

// Success notification
export const showSuccessAlert = (message: string, title: string = 'Berhasil!') => {
    return Swal.fire({
        ...toastConfig,
        icon: 'success',
        title: title,
        text: message,
    });
};

// Error notification
export const showErrorAlert = (message: string, title: string = 'Error!') => {
    return Swal.fire({
        ...toastConfig,
        icon: 'error',
        title: title,
        text: message,
        timer: 4000, // Error lebih lama sedikit
    });
};

// Warning notification
export const showWarningAlert = (message: string, title: string = 'Peringatan!') => {
    return Swal.fire({
        ...toastConfig,
        icon: 'warning',
        title: title,
        text: message,
    });
};

// Info notification
export const showInfoAlert = (message: string, title: string = 'Informasi') => {
    return Swal.fire({
        ...toastConfig,
        icon: 'info',
        title: title,
        text: message,
    });
};

// Confirmation dialog
export const showConfirmAlert = (
    message: string,
    title: string = 'Konfirmasi',
    confirmButtonText: string = 'Ya, Lanjutkan',
    cancelButtonText: string = 'Batal',
) => {
    return Swal.fire({
        title: title,
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        reverseButtons: true,
        focusCancel: true,
        background: '#ffffff',
        color: '#374151',
    });
};

// Delete confirmation dialog
export const showDeleteConfirmAlert = (message: string = 'Data yang dihapus tidak dapat dikembalikan!', title: string = 'Hapus Data?') => {
    return Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal',
        reverseButtons: true,
        focusCancel: true,
        background: '#ffffff',
        color: '#374151',
    });
};

// Loading alert
export const showLoadingAlert = (message: string = 'Memproses...', title: string = 'Mohon Tunggu') => {
    return Swal.fire({
        title: title,
        text: message,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

// Close loading alert
export const closeLoadingAlert = () => {
    Swal.close();
};
