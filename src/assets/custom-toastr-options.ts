import {ToastOptions} from 'ng2-toastr';

export class CustomToastrOptions extends ToastOptions {
  animate = 'fade'; 
  newestOnTop = false;
  showCloseButton = false;
  positionClass = "toast-bottom-full-width";
  messageClass = 'toast-message-custom';
  toastLife = 2000;
}