import {Component, OnInit} from '@angular/core';
import {Plan} from '../../model/plan.entity';
import {PlanService} from '../../services/plan.service';
import {SubscriptionItemComponent} from '../../components/subscription-item/subscription-item.component';
import {SubscriptionService} from '../../services/subscriptions.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-subscription-choose',
  standalone: true,
  imports: [
    CommonModule,
    SubscriptionItemComponent
  ],
  templateUrl: './subscription-choose.component.html',
  styleUrl: './subscription-choose.component.css'
})
export class SubscriptionChooseComponent implements OnInit {
  plans: Plan[] = [];
  currentPlanType: string | null = null;

  constructor(
    private planService: PlanService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.checkCurrentPlanAndLoad();
  }

  checkCurrentPlanAndLoad(): void {
    const accountId = localStorage.getItem('accountId');
    if (!accountId) return;

    this.planService.getCurrentPlan(accountId).subscribe({
      next: (planType: string) => {
        this.currentPlanType = planType;
        console.log('Current plan type:', this.currentPlanType);
        this.loadPlans();
      },
      error: (err) => console.error('Error loading current plan', err)
    });
  }

  loadPlans(): void {
    this.planService.getAllPlans().subscribe({
      next: (data) => {
        this.plans = data;
      },
      error: (error) => {
        console.error('Error loading plans:', error);
      }
    });
  }

  onChoosePlan(planId: number): void {
    const accountIdStr = localStorage.getItem('accountId');
    if (!accountIdStr) return;
    const accountId = Number(accountIdStr);


    const isFree = !this.currentPlanType || this.currentPlanType === 'Free';

    const request$ = isFree
      ? this.subscriptionService.subscribeToPlan(planId, accountId)
      : this.subscriptionService.upgradeSubscription(planId, accountId);

    request$.subscribe({
      next: (response) => {
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
        } else {
          console.error('Subscription error:', response.message || 'Unknown error');
        }
      },
      error: (err) => {
        console.error('Subscription failed:', err);
      }
    });
  }


  trackByPlanId(index: number, plan: Plan): number {
    return plan.planId;
  }
}
