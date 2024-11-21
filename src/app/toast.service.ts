import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  title?: string;  // Optional title
  type: 'success' | 'error' | 'info' | 'warning' | 'custom' | 'critical' | 'alert' | 'debug';
  duration?: number; // duration in milliseconds
  icon?: string; // Optional icon
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; // New position property
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];
  private toastSubject = new BehaviorSubject<Toast[]>([]);

  getToasts() {
    return this.toastSubject.asObservable();
  }
  show(message: string, type: 'success' | 'error' | 'info' | 'warning' | 'custom' | 'critical' | 'alert' | 'debug', title?: string, duration: number = 3000, icon?: string, preventDuplicates: boolean = true, position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right') {
    // Prevent duplicates
    if (preventDuplicates && this.toasts.some(toast => toast.message === message && toast.type === type)) {
      return; // If duplicate found, exit the function
    }

    const toast: Toast = { message, title, type, duration, icon, position };
    this.toasts.push(toast);
    this.toastSubject.next(this.toasts);

    if (duration) {
      setTimeout(() => this.remove(toast), duration);
    }
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.toastSubject.next(this.toasts);
  }


  

  constructor() { }
}
