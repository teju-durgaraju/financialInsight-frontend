import { Component } from '@angular/core';
// import { DashboardComponent } from './features/dashboard/dashboard.component'; // Comment out or remove
import { LoginComponent } from './features/auth/login/login.component'; // Import LoginComponent

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [DashboardComponent], // Comment out or remove
  imports: [LoginComponent], // Add LoginComponent here
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'finSight';
}
