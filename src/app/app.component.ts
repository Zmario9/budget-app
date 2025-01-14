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
  constructor(private moneyManagement: MoneyManagementService){
    this.entries = this.moneyManagement.arrayMovements;
  }

  getTotalIngress(){
    let totalIncome: number = this.entries.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
    return totalIncome;
  }

  getTotalEgress(){
    let totalEgress: number = this.entries.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);
    return totalEgress;
  }

  getTotalPercernt(){
    let totalPercent: number = (this.getTotalEgress()/this.getTotalIngress());//(this.getTotalEgress() / this.getTotalIngress());
    return totalPercent;
  }

  getTotalMoney(){
    let totalMoney: number = this.getTotalIngress() - this.getTotalEgress();
    return totalMoney;
  }


  // getPercentElement(){
  //   this.entries.forEach(element => {
  //     if (!element.isIncome) {
  //       element.percentage = element.money / this.getTotalIngress();
  //     }
  //   });
  // }
}
