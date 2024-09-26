import { Injectable, EventEmitter } from '@angular/core';
import { moneyMovement } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class MoneyManagementService {
  arrayMovements: moneyMovement[] = [
    new moneyMovement('Comida', 100, true),
    new moneyMovement('Cena', 250, true),
    new moneyMovement('Trabajo', 300, false),
  ];
  ingresoTotal: number = this.arrayMovements.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
  egresoTotal: number = this.arrayMovements.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);;
  totalMoney: number = this.ingresoTotal - this.egresoTotal;


  sendlist = new EventEmitter<moneyMovement[]>();

  addMovement(reason: string, money: number, isIncome: boolean, percentage?: number) {
    this.arrayMovements.push(new moneyMovement(reason, money, isIncome, percentage));
    this.ingresoTotal = this.arrayMovements.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
    this.egresoTotal = this.arrayMovements.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);
    this.totalMoney = this.ingresoTotal - this.egresoTotal;
    console.log(this.arrayMovements);
    console.log(this.ingresoTotal, this.egresoTotal, this.totalMoney);
  }

  constructor() { }
}
