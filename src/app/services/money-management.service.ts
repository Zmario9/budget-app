import { Injectable, EventEmitter } from '@angular/core';
import { moneyMovement } from '../models/form.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoneyManagementService {
  //Obtengo los datos que vengan del backend
  public arrayMovements: moneyMovement[] = [];

  constructor(Http: HttpClient) {
    Http.get<moneyMovement[]>('http://localhost:3000/api/modules/moneyMovements').subscribe((response: moneyMovement[]) => {
      const res = response;
      res.map(element => this.arrayMovements.push(element));
      //Defino el total de ingresos y egresos con un foreach para cada elemento
      this.arrayMovements.forEach(element => {
        //Si el registro no es de ingreso
        if (!element.isIncome) {
          //Defino su propiedad de porcentaje con respecto al ingreso total
          element.percentage = (element.money / this.ingresoTotal);
          console.log(element.percentage);
        }
        console.log(element);
      });
      console.log(this.arrayMovements);
    });
  }
  ingresoTotal: number = this.arrayMovements.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
  egresoTotal: number = this.arrayMovements.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);
  totalMoney: number = this.ingresoTotal - this.egresoTotal;
  percentage: number = 0;
  totalpercentage: number = this.egresoTotal / this.ingresoTotal;

  sendlist = new EventEmitter<moneyMovement[]>();

  addMovement(reason: string, money: number, isIncome: boolean, percentage?: number) {
    const newMovement = new moneyMovement(reason, money, isIncome, percentage)
    this.arrayMovements.push(newMovement);

    this.ingresoTotal = this.arrayMovements.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
    this.egresoTotal = this.arrayMovements.reduce((a, b) => !b.isIncome ? a + b.money : a + 0, 0);
    this.totalMoney = this.ingresoTotal - this.egresoTotal;
    this.totalpercentage = this.egresoTotal / this.ingresoTotal;

    this.arrayMovements.forEach(element => {
      if (!element.isIncome) {
        element.percentage = (element.money / this.ingresoTotal);
        console.log(element.percentage);
      }
    });
    console.log(this.arrayMovements);
    console.log(this.ingresoTotal, this.egresoTotal, this.totalMoney);
    console.log("Porcentaje total de egresos: " + this.totalpercentage);
    return this.arrayMovements, this.ingresoTotal, this.egresoTotal, this.totalMoney;
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
      if (!element.isIncome) {
        element.percentage = element.money / this.ingresoTotal;
        console.log(element.percentage);
      }
    });
    console.log(this.arrayMovements);
    console.log(this.ingresoTotal);
  }
}