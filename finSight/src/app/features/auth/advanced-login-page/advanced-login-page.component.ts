import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ScrollingInsightsTickerComponent } from '../../../shared/components/scrolling-insights-ticker/scrolling-insights-ticker.component';

import { HostBinding } from '@angular/core'; // Import HostBinding

@Component({
  selector: 'app-advanced-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollingInsightsTickerComponent],
  templateUrl: './advanced-login-page.component.html',
  styleUrls: ['./advanced-login-page.component.scss'],
  animations: [
    trigger('pageEntrance', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
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
export class AdvancedLoginPageComponent implements OnInit {
  @HostBinding('@pageEntrance') animatePage = true; // Apply animation to host element

  loginForm!: FormGroup;

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
    this.loginForm.markAllAsTouched();
    this.emailShakeState.set('default');
    this.passwordShakeState.set('default');

    if (this.loginForm.invalid) {
      this.errorMessage.set('Please correct the errors in the form.');
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

    this.isLoading.set(true);
    this.errorMessage.set(null);
    console.log('Login form submitted:', this.loginForm.value);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login successful (simulated)');
    } catch (error: any) {
      console.error('Login failed (simulated):', error);
      this.errorMessage.set(error?.message || 'Login failed. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
