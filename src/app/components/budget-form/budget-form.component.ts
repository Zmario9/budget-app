import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoneyManagementService } from '../../services/money-management.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [FormsModule, NgClass, ReactiveFormsModule],
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

  sendForm() {
    const inputValue = this.reasonInput.trim();
    console.log(inputValue);
    if (inputValue === '' || this.moneyInput <= 0) {
      console.log('No se ha podido añadir el movimiento');
      return;
    }
    if (this.selectedOption === "1") {
      this.moneyManagement.addMovement(inputValue, this.moneyInput, true);
    } else {
      //this.moneyInput / this.moneyManagement.ingresoTotal * 100
      this.moneyManagement.addMovement(inputValue, this.moneyInput, false);
    }
    this.moneyInput = 0;
    this.reasonInput = '';
    this.moneyManagement.sendlist.emit(this.moneyManagement.arrayMovements);
  }
}
