export class moneyMovement {
    constructor(public reason: string, public money: number, public isIncome: boolean, public percentage?: number) {
        this.reason = reason;
        this.money = money;
        this.isIncome = isIncome;
        if (!isIncome) {
            this.percentage = percentage;
        }
    }
}