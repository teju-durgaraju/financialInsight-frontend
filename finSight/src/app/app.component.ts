import { Component } from '@angular/core';
import { FloatingLoginPageComponent } from './features/auth/floating-login-page/floating-login-page.component'; // Import new component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FloatingLoginPageComponent], // Use new component
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'finSight';
}
