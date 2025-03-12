import Swal from 'sweetalert2'

export const Confirm = Swal.mixin({
  title: 'Cảnh báo!',
  text: 'Bạn có chắc chắn muốn đăng xuất?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Xác nhận',
  cancelButtonText: 'Hủy',
  reverseButtons: true,
  customClass: {
    confirmButton: 'bg-primary text-white',
    cancelButton: 'bg-white border border-[1px] border-primary text-primary'
  }
})