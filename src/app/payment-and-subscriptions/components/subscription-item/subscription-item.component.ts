import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Plan} from '../../model/plan.entity';
import {MatCardModule} from '@angular/material/card';
import {NgIf} from '@angular/common';

const PLAN_RANK: Record<string, number> = {
  Free: 1,
  PremiumMonthly: 2,
  PremiumAnnual: 3,
};


@Component({
  selector: 'app-subscription-item',
  imports: [
    MatCardModule,
    NgIf
  ],
  templateUrl: './subscription-item.component.html',
  styleUrl: './subscription-item.component.css'
})
export class SubscriptionItemComponent {
  @Input() plan!: Plan;
  @Input() currentPlanType: string | null = null;
  @Output() choose = new EventEmitter<number>();

  get isCurrentPlan(): boolean {
    return this.plan.planType === this.currentPlanType;
  }

  get canChoose(): boolean {
    const currentRank = PLAN_RANK[this.currentPlanType ?? ''] ?? 0;
    const thisRank = PLAN_RANK[this.plan.planType] ?? 0;

    const isCurrent = this.plan.planType === this.currentPlanType;
    const isUpgrade = thisRank > currentRank;

    return !isCurrent && isUpgrade;
  }


  choosePlan() {
    const currentRank = PLAN_RANK[this.currentPlanType ?? ''] ?? 0;
    const thisRank = PLAN_RANK[this.plan.planType] ?? 0;

    const isUpgrade = thisRank > currentRank;
    const canChoose = !this.isCurrentPlan && isUpgrade;

    if (canChoose) {
      this.choose.emit(this.plan.planId);
    }
  }
}
