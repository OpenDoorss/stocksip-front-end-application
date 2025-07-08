import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionService} from '../../services/subscriptions.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-payment-upgrade-confirmed',
  imports: [
    MatButton
  ],
  templateUrl: './payment-upgrade-confirmed.component.html',
  styleUrl: './payment-upgrade-confirmed.component.css'
})
export class PaymentUpgradeConfirmedComponent implements OnInit{
  message: string = '';
  token: string | null = null;
  accountId: number | null = null;
  planId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.accountId = Number(this.route.snapshot.queryParamMap.get('accountId'));
    this.planId = Number(this.route.snapshot.queryParamMap.get('planId'));

    if (!this.token || !this.accountId || !this.planId) {
      this.router.navigate(['/sign-in']);
      return;
    }

    this.subscriptionService.completeSubscription(this.token, this.accountId, this.planId).subscribe({
      next: (response) => {
        console.log('✅ Complete upgrade response:', response);
        this.message = response.message || 'Subscription completed successfully';
      },
      error: (error) => {
        console.error('❌ Error completing upgrade:', error);
        this.message = 'There was an error completing the subscription.';
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
