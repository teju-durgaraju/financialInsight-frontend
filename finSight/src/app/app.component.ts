import { Component } from '@angular/core';
import { AdvancedLoginPageComponent } from './features/auth/advanced-login-page/advanced-login-page.component'; // Import new component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdvancedLoginPageComponent], // Use new component
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'finSight';
}
