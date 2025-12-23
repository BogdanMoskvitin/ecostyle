import { Injectable, signal } from '@angular/core';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private counter = 0;

  toasts = signal<Toast[]>([]);

  show(message: string, type: ToastType = 'info') {
    const toast: Toast = {
      id: ++this.counter,
      message,
      type,
    };

    this.toasts.update(t => [...t, toast]);

    setTimeout(() => this.remove(toast.id), 3000);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  remove(id: number) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
