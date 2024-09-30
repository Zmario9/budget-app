import { Injectable, EventEmitter } from '@angular/core';
import { moneyMovement } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class MoneyManagementService {
  //Obtengo los datos que vengan del backend
  arrayMovements: moneyMovement[] = [
    new moneyMovement('Comida', 100, true),
    new moneyMovement('Cena', 250, true),
    new moneyMovement('Trabajo', 300, false),
  ];

  constructor() { 
    //Defino el total de ingresos y egresos con un foreach para cada elemento
    this.arrayMovements.forEach(element => {
      //Si el registro no es de ingreso
      if(!element.isIncome){
        //Defino su propiedad de porcentaje con respecto al ingreso total
        let value = ((element.money / this.ingresoTotal) * 100).toFixed(2);
        element.percentage = (Number(value));
        console.log(element.percentage);
      }
      console.log(element);
    });
  }
  ingresoTotal: number = this.arrayMovements.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
  egresoTotal: number = this.arrayMovements.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);
  totalMoney: number = this.ingresoTotal - this.egresoTotal;
  percentage: number = 0;
  totalpercentage: number = ((this.egresoTotal * 100) / this.ingresoTotal);;



  sendlist = new EventEmitter<moneyMovement[]>();

  addMovement(reason: string, money: number, isIncome: boolean, percentage?: number) {
    const newMovement = new moneyMovement(reason, money, isIncome, percentage)
    this.arrayMovements.push(newMovement);

    this.ingresoTotal = this.arrayMovements.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
    this.egresoTotal = this.arrayMovements.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);
    this.totalMoney = this.ingresoTotal - this.egresoTotal;
    this.totalpercentage = ((this.egresoTotal * 100) / this.ingresoTotal);

    this.arrayMovements.forEach(element => {
      if(!element.isIncome){
        let value = ((element.money / this.ingresoTotal) * 100).toFixed(2);
        element.percentage = (Number(value));
        console.log(element.percentage);
      }
    });

    console.log(this.arrayMovements);
    console.log(this.ingresoTotal, this.egresoTotal, this.totalMoney);
    console.log("Porcentaje total de egresos: " + this.totalpercentage);
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