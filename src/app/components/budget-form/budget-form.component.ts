import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoneyManagementService } from '../../services/money-management.service';
import { moneyMovement } from '../../models/form.model';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.scss'
})
export class BudgetFormComponent {
  public reasonInput: string = '';
  public moneyInput: number = 0;
  public selectedOption: string = "1";
  public options = [
    { name: "+", value: 1 },
    { name: "-", value: 2 }
  ]

  constructor(public moneyManagement: MoneyManagementService) { }

  sendForm(select: Event) {
    if (this.reasonInput.trim() === '' && this.moneyInput === 0) {
      return alert('Rellena los campos');
    }
    console.log(this.selectedOption);
    console.log(typeof this.selectedOption);
    if (this.selectedOption === "1") {
      this.moneyManagement.addMovement(this.reasonInput, this.moneyInput, true);
    } else {
      this.moneyManagement.addMovement(this.reasonInput, this.moneyInput, false)
    }
    this.moneyManagement.sendlist.emit(this.moneyManagement.arrayMovements);
  }

}
