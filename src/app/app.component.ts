import { Component } from '@angular/core';
import { ToastService } from './toast.service';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'toastDemo';

  constructor(private toastService: ToastService) {}

  showToast(
    message: string,
    type:
      | 'success'
      | 'error'
      | 'info'
      | 'warning'
      | 'custom'
      | 'critical'
      | 'alert'
      | 'debug',
    title?: string,
    preventDuplicates: boolean = true,
    position:
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right' = 'top-right'
  ) {
    let icon = '';
    switch (type) {
      case 'success':
        icon = 'fas fa-check-circle';
        break;
      case 'error':
        icon = 'fas fa-exclamation-circle';
        break;
      case 'info':
        icon = 'fas fa-info-circle';
        break;
      case 'warning':
        icon = 'fas fa-exclamation-triangle';
        break;
      case 'custom':
        icon = 'fas fa-cog';
        break;
      case 'critical':
        icon = 'fas fa-bomb';
        break;
      case 'alert':
        icon = 'fas fa-bell';
        break;
      case 'debug':
        icon = 'fas fa-bug';
        break;
    }
    this.toastService.show(
      message,
      type,
      title,
      3000,
      icon,
      preventDuplicates,
      position
    );
  }
}
