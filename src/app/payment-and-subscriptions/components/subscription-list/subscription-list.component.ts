import {Component, Input} from '@angular/core';
import {Plan} from '../../model/plan.entity';
import {SubscriptionItemComponent} from '../subscription-item/subscription-item.component';

@Component({
  selector: 'app-subscription-list',
  imports: [
    SubscriptionItemComponent
  ],
  templateUrl: './subscription-list.component.html',
  styleUrl: './subscription-list.component.css'
})
export class SubscriptionListComponent {
  @Input() plans!: Plan[]
}
