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

  constructor() { 
    this.arrayMovements.forEach(element => {
      if(!element.isIncome){
        let value = ((element.money / this.ingresoTotal) * 100).toFixed(2);
        element.percentage = (Number(value));
        console.log(element.percentage);
      }
    });
  }

  ingresoTotal: number = this.arrayMovements.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
  egresoTotal: number = this.arrayMovements.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);
  totalMoney: number = this.ingresoTotal - this.egresoTotal;
  percentage: number = 0;



  sendlist = new EventEmitter<moneyMovement[]>();

  addMovement(reason: string, money: number, isIncome: boolean, percentage?: number) {
    const newMovement = new moneyMovement(reason, money, isIncome, percentage)
    this.arrayMovements.push(newMovement);

    this.ingresoTotal = this.arrayMovements.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
    this.egresoTotal = this.arrayMovements.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);
    this.totalMoney = this.ingresoTotal - this.egresoTotal;

    this.arrayMovements.forEach(element => {
      if(!element.isIncome){
        let value = ((element.money / this.ingresoTotal) * 100).toFixed(2);
        element.percentage = (Number(value));
        console.log(element.percentage);
      }
    });
    console.log(this.arrayMovements);
    console.log(this.ingresoTotal, this.egresoTotal, this.totalMoney);
  }

  deleteRegistry(element: moneyMovement) {
    const index = this.arrayMovements.indexOf(element);
    if (index > -1) {
      console.log(index);
      this.arrayMovements.splice(index, 1);
    }
    console.log(this.arrayMovements);
    this.ingresoTotal = this.arrayMovements.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);

    this.arrayMovements.forEach(element => {
      if(!element.isIncome){
        let percent:string = ((element.money / this.ingresoTotal) * 100).toFixed(2);
        element.percentage = Number(percent);
        console.log(element.percentage);
      }
    });
    console.log(this.arrayMovements);
    console.log(this.ingresoTotal);
  }
}

const getIfNumberIsFinite = (value: number, percentage: number) => {

}