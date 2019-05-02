/**
 * Toaster
 * Levels: ['success', 'error', 'warning', 'info']
 */
import toastr from 'toastr/build/toastr.min';

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '0',
  hideDuration: '0',
  timeOut: '2500',
  extendedTimeOut: '0',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

export const toastServerError = () => toastr.error('Something is wrong. Please try again or alert us.');

export const toastSuccess = (title, message) => toastr.success(message, title);
