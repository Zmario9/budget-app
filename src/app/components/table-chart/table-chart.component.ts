import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moneyMovement } from '../../models/form.model';
import { MoneyManagementService } from '../../services/money-management.service';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-table-chart',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './table-chart.component.html',
  styleUrl: './table-chart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableChartComponent {
  @Input() entriesList: moneyMovement[] = [];
  numInf: number = Infinity;
  constructor(private moneyManagement: MoneyManagementService){

  }

  deleteRegistry(element: moneyMovement){
    const index = this.entriesList.indexOf(element);
    if (index > -1) {
      console.log(index);
      this.entriesList.splice(index, 1);
    }
    console.log(this.entriesList);

    this.moneyManagement.deleteRegistry(element);
    console.log(element.percentage);
    this.moneyManagement.sendlist.emit(this.moneyManagement.arrayMovements);
  }
  checkInfinity(value: number){
    console.log(value);
  }
}
