import { Injectable, EventEmitter } from '@angular/core';
import { moneyMovement } from '../models/form.model';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoneyManagementService {
  //Obtengo los datos que vengan del backend
  public arrayMovements: moneyMovement[] = [];
  public ingresoTotal: number = 0;
  public egresoTotal: number = 0;
  public totalMoney: number = 0;
  public percentage: number = 0;
  public totalpercentage: number = 0;

  constructor(private Http: HttpClient) {
    Http.get<moneyMovement[]>('http://localhost:3000/api/modules/moneyMovements').subscribe((response: moneyMovement[]) => {
      const res = response;
      res.map(element => this.arrayMovements.push(element));
      const ingresoTotal = this.arrayMovements.reduce((a, b) => b.isIncome ? a + b.money : a + 0, 0);
      console.log(res);
      res.forEach(element => {
        if (!element.isIncome) {
          element.percentage = element.money / ingresoTotal;
        }
      });
    },
      (error: any) => {
        console.log("No se han podido obtener los datos");
        console.log(error);
      });
  }
  sendlist = new EventEmitter<moneyMovement[]>();
  addMovement(reason: string, money: number, isIncome: boolean, percentage?: number) {
    let newMovement = new moneyMovement(reason, money, isIncome, percentage);

    this.Http.post<moneyMovement>('http://localhost:3000/api/modules/moneyMovements', newMovement).subscribe((response: moneyMovement) => {
      console.log("Movimiento añadido");
      newMovement.id = response.id;
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
    },
      (error: any) => {
        console.log("No se ha podido añadir el movimiento");
        console.log(error);
      });
    console.log(this.arrayMovements);
    console.log(this.ingresoTotal, this.egresoTotal, this.totalMoney);
    console.log("Porcentaje total de egresos: " + this.totalpercentage);
  }

  deleteRegistry(element: moneyMovement) {
    const index = this.arrayMovements.indexOf(element);
    const id = element.id;
    if (index > -1) {
      console.log(index);
      this.arrayMovements.splice(index, 1);
      this.Http.delete<moneyMovement>('http://localhost:3000/api/modules/moneyMovements/' + element.id).subscribe((response: moneyMovement) => {
        console.log("Movimiento eliminado");
        console.log(response);
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
      },
        (error: any) => {
          console.log("No se ha podido eliminar el movimiento");
          console.log(error);
        });
    }
  }
}