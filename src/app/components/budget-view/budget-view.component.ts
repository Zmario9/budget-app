import { Component, Input } from '@angular/core';
import { MoneyManagementService } from '../../services/money-management.service';
import { moneyMovement } from '../../models/form.model';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.scss'
})
export class BudgetViewComponent {
  // @Input() arrayMovements: moneyMovement[] = [];
  totalIncome: number = 0;
  totalEgress: number = 0;
  totalMoney: number = 0;

  constructor (private moneyManagement: MoneyManagementService){
    this.moneyManagement.sendlist.subscribe((data) => {
      this.totalIncome = data.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
      this.totalEgress = data.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);
      this.totalMoney = this.totalIncome - this.totalEgress;
    });
  }

  // ngOnInit(){

  // }
}
