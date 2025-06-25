import { Component, OnInit, signal, WritableSignal } from '@angular/core'; // Import signal and WritableSignal
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  // Signals for managing UI state
  isLoading: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  async onSubmit(): Promise<void> { // Make onSubmit async for potential API calls
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Mark fields as touched to show validation errors
      this.errorMessage.set('Please correct the errors in the form.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    console.log('Login form submitted:', this.loginForm.value);

    // Simulate API Call
    try {
      // Replace with actual auth service call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Example: const response = await this.authService.login(this.loginForm.value).toPromise();

      console.log('Login successful (simulated)');
      // Handle successful login (e.g., navigate to dashboard)
      // this.router.navigate(['/dashboard']);

    } catch (error: any) {
      console.error('Login failed (simulated):', error);
      this.errorMessage.set(error?.message || 'Login failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
