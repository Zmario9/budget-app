import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//Componentes
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { BudgetViewComponent } from './components/budget-view/budget-view.component';
import { TableChartComponent } from './components/table-chart/table-chart.component';
//Modelos
import { moneyMovement } from './models/form.model';
//Servicios
import { MoneyManagementService } from './services/money-management.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BudgetFormComponent, BudgetViewComponent, TableChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'budget-app';
  public entries: moneyMovement[] = [];
  public totalEg: number = 0;
  public totalInc : number = 0;
  public totalMoney: number = 0;
  constructor(private moneyManagement: MoneyManagementService){}

  ngOnInit(){
    this.totalInc = this.moneyManagement.ingresoTotal;
    this.totalEg = this.moneyManagement.egresoTotal;
    this.entries = this.moneyManagement.arrayMovements;
    this.totalMoney = this.moneyManagement.totalMoney;
    console.log(this.totalInc, this.totalEg, this.totalMoney);
  }
}
