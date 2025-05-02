import { Injectable } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private container: HTMLElement | null = null;

  constructor() {
    this.ensureContainerExists();
  }

  private ensureContainerExists() {
    this.container = document.querySelector('.toast-container');
    if (!this.container) {
      const div = document.createElement('div');
      div.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(div);
      this.container = div;
    }
  }

  show(message: string, type: 'success' | 'danger' | 'info' | 'warning' = 'success') {
    if (!this.container) return;

    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');

    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    this.container.appendChild(toastEl);

    const bootstrapToast = new Toast(toastEl,{
      delay: 10000
    });
    bootstrapToast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  }
}
