import { Component, Input } from '@angular/core';
import { MoneyManagementService } from '../../services/money-management.service';
//Common module trae los pipes por defecto
import { NgClass, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [NgClass, NgIf, CommonModule],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.scss'
})
export class BudgetViewComponent {
  // @Input() arrayMovements: moneyMovement[] = [];
  @Input() totalIncome: number = 0;
  @Input() totalEgress: number = 0;
  @Input() totalMoney: number = 0;
  @Input() percentTotal: number = 0;
  infiniNumber: number = Infinity;
  nanNumber: number = NaN;

  constructor (private moneyManagement: MoneyManagementService){
    this.moneyManagement.sendlist.subscribe((data) => {
      this.totalIncome = data.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
      this.totalEgress = data.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);
      this.percentTotal = (this.totalEgress / this.totalIncome);
      this.totalMoney = this.totalIncome - this.totalEgress;
    });
  }

  ngOnInit(){
    this.totalMoney = this.moneyManagement.totalMoney;  
    this.totalIncome = this.moneyManagement.ingresoTotal;
    this.totalEgress = this.moneyManagement.egresoTotal;
    this.percentTotal = this.moneyManagement.totalpercentage;
  }
  numberIsNan(value: number){
    if(isNaN(value)){
      return true;
    }
    return false;
  }
}
