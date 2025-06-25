import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('shakeAnimation', [
      state('default', style({ transform: 'translateX(0)' })),
      state('shaking', style({ transform: 'translateX(0)' })), // End state is same as default after shake
      transition('default => shaking', [
        animate('500ms ease-in-out', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-8px)', offset: 0.1 }),
          style({ transform: 'translateX(8px)', offset: 0.2 }),
          style({ transform: 'translateX(-8px)', offset: 0.3 }),
          style({ transform: 'translateX(8px)', offset: 0.4 }),
          style({ transform: 'translateX(-6px)', offset: 0.5 }),
          style({ transform: 'translateX(6px)', offset: 0.6 }),
          style({ transform: 'translateX(-4px)', offset: 0.7 }),
          style({ transform: 'translateX(4px)', offset: 0.8 }),
          style({ transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
    ]),
    trigger('fadeAnimation', [ // New fade animation
      state('void', style({ opacity: 0, transform: 'translateY(-10px)' })), // State for when element is not in DOM or enters
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),    // State for when element is visible
      transition(':enter', [ // Transition for entering the DOM
        animate('300ms ease-out')
      ]),
      transition(':leave', [ // Transition for leaving the DOM
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  // Signals for managing UI state
  isLoading: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string | null> = signal(null);
  emailShakeState: WritableSignal<string> = signal('default');
  passwordShakeState: WritableSignal<string> = signal('default');

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  async onSubmit(): Promise<void> {
    this.loginForm.markAllAsTouched(); // Mark fields for immediate feedback

    // Reset shake states to 'default' to prepare for potential new shake
    this.emailShakeState.set('default');
    this.passwordShakeState.set('default');

    if (this.loginForm.invalid) {
      this.errorMessage.set('Please correct the errors in the form.');
      // Use a minimal timeout to allow Angular to process the 'default' state change
      // before changing to 'shaking', ensuring the animation re-triggers.
      setTimeout(() => {
        if (this.loginForm.get('email')?.invalid) {
          this.emailShakeState.set('shaking');
        }
        if (this.loginForm.get('password')?.invalid) {
          this.passwordShakeState.set('shaking');
        }
      }, 0);
      return;
    }

    // If form is valid, proceed with submission
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

  // Helper to manage shake animation and reset it
  // This explicit reset to default might not be needed if animation naturally ends there
  // and we correctly re-trigger by changing state from default -> shaking.
  // For now, the setTimeout() in onSubmit helps re-trigger.
}
