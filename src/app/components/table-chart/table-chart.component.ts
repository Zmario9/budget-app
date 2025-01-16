import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moneyMovement } from '../../models/form.model';
import { MoneyManagementService } from '../../services/money-management.service';
import { CommonModule } from '@angular/common';
import { ResizeService } from '../../services/resize.service';


@Component({
  selector: 'app-table-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-chart.component.html',
  styleUrl: './table-chart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableChartComponent {
  @Input() entriesList: moneyMovement[] = [];
  numInf: number = Infinity;
  sizeScreen: number = 0;
  isIncome: boolean = true;
  constructor(private moneyManagement: MoneyManagementService, private resizeService: ResizeService){
    this.resizeService.resizeManagement();
    this.sizeScreen = this.resizeService.sizeScreen;
    this.resizeService.sendSize.subscribe((size: number) => this.sizeScreen = size);
  }

  ngOnInit(){
    this.sizeScreen = window.innerWidth;
  }
  deleteRegistry(element: moneyMovement){
    this.moneyManagement.deleteRegistry(element);
    // console.log(element.percentage);
    this.moneyManagement.sendlist.emit(this.moneyManagement.arrayMovements);
  }
  setIncome(){
    this.isIncome = true;
  }
  setOutcome(){
    this.isIncome = false;
  }
}
