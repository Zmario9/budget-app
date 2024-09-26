import { Component, Input } from '@angular/core';
import { moneyMovement } from '../../models/form.model';

@Component({
  selector: 'app-table-chart',
  standalone: true,
  imports: [],
  templateUrl: './table-chart.component.html',
  styleUrl: './table-chart.component.scss'
})
export class TableChartComponent {
  @Input() entriesList: moneyMovement[] = [];
  constructor(){}
}
