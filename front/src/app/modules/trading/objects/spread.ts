
export class Spread {

    bid: number;
    ask: number;
    timestamp: Date;
    bidVolume: number;
    askVolume: number;

    constructor(data: any) {
        this.bid = +data[0];
        this.ask = +data[1];
        this.timestamp = new Date(+data[2]);
        this.bidVolume = +data[3];
        this.askVolume = +data[4];
    }

    public toString() {
        return JSON.stringify(this);
    }

    public getProfit(feeRate: number): number {
        return feeRate * Math.abs(this.bid - this.ask);
    }

    public getMiddlePrice(): number {
        return (this.bid + this.ask) / 2;
    }

    public getPercentOfSpread(percent: number): number {
        return Math.abs(this.ask - this.bid) * percent;
    }

}
