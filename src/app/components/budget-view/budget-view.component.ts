import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MoneyManagementService } from '../../services/money-management.service';
//Common module trae los pipes por defecto
import { NgClass, NgIf, CommonModule } from '@angular/common';
import { moneyMovement } from '../../models/form.model';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [NgClass, NgIf, CommonModule],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BudgetViewComponent {
  @Input() totalIncome: number = 0;
  @Input() totalEgress: number = 0;
  @Input() totalMoney: number = 0;
  @Input() percentTotal: number = 0;
  infiniNumber: number = Infinity;
  nanNumber: number = NaN;

  constructor (private moneyManagement: MoneyManagementService){
 
  }

  numberIsNan(value: number){
    if(isNaN(value)){
      return true;
    }
    return false;
  }
}
