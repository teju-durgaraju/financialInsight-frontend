import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'; // Import animations

@Component({
  selector: 'app-floating-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './floating-login-page.component.html',
  styleUrls: ['./floating-login-page.component.scss'],
  animations: [ // Copied from AdvancedLoginPageComponent (excluding pageEntrance)
    trigger('shakeAnimation', [
      state('default', style({ transform: 'translateX(0)' })),
      state('shaking', style({ transform: 'translateX(0)' })),
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
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(-10px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class FloatingLoginPageComponent implements OnInit {
  backgroundImages: string[] = [
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1642790599079- দেখতে-unable-to-translate?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNyeXB0b2N1cnJlbmN5fGVufDB8fDB8fHww&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1518546302803-69030bae9913?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN0b2NrJTIwbWFya2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvY2tjaGFpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1920&q=80'
  ];

  loginForm!: FormGroup;
  passwordFieldType: WritableSignal<'password' | 'text'> = signal('password');
  isLoading: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string | null> = signal(null);
  emailShakeState: WritableSignal<string> = signal('default'); // Added for shake animation
  passwordShakeState: WritableSignal<string> = signal('default'); // Added for shake animation


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType.update(currentType => currentType === 'password' ? 'text' : 'password');
  }

  async onSubmit(): Promise<void> {
    this.loginForm.markAllAsTouched();
    this.emailShakeState.set('default'); // Reset shake state
    this.passwordShakeState.set('default'); // Reset shake state

    if (this.loginForm.invalid) {
      this.errorMessage.set('Please correct the errors in the form.');
      setTimeout(() => { // Timeout to allow state change for animation re-trigger
        if (this.loginForm.get('email')?.invalid) {
          this.emailShakeState.set('shaking');
        }
        if (this.loginForm.get('password')?.invalid) {
          this.passwordShakeState.set('shaking');
        }
      }, 0);
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    console.log('Login form submitted:', this.loginForm.value);

    // Simulate API Call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate async operation
      console.log('Login successful (simulated)');
      // Handle successful login (e.g., navigate to dashboard)
    } catch (error: any) {
      console.error('Login failed (simulated):', error);
      this.errorMessage.set(error?.message || 'Login failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
