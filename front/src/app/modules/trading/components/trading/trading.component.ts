import { OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {KrakenService} from '../../services/kraken.service';
import {Subject} from 'rxjs';
import {environment} from '../../../../../environments/environment';

import { Component, NgZone } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {Spread} from '../../objects/spread';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-trading',
    templateUrl: './trading.component.html',
    styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit, AfterViewInit, OnDestroy {

    public static INIT_WALLET = 5000;
    public static FEE_MAX_RATE = 0.0026;
    // should be between 0.0 < MARGIN <0.5 closest to 0 highest will be the profit
    public static MARGIN = 0.1;
    public latency = 2;

    public profit: number;

    public gain = 0;
    public lastBuyPrice: number;
    public myWallet = TradingComponent.INIT_WALLET;
    public spread: Spread;

    private chart: am4charts.XYChart;
    private transactionDate: Date = null;
    private wannaBuy = true;

    constructor(
        private zone: NgZone,
        private readonly  krakenService: KrakenService
    ) {
        // krakenService.connect(environment.kraken.ws);
    }

    private ping = {
        event: 'ping',
        reqid: 42
    };

    public ngOnInit(): void {
        this.krakenService.getSpread().subscribe(
            (spread: Spread) => {
                // make a desicions
                this.spread = spread;
                this.algoTrade(this.spread);
            }
        );
    }

    public algoTrade(spread: Spread) {

        // ask only
        const timePassed = this.transactionDate == null || this.transactionDate.getTime() + this.latency < spread.timestamp.getTime();
        if (timePassed && this.wannaBuy) {
            // buy one bitcoin as middle of bid ans ask - 90%
            let buyPrice = (spread.getMiddlePrice() - spread.getPercentOfSpread(0.50 - TradingComponent.MARGIN));
            console.log(`achat de ${buyPrice} spread is ${spread.ask} ${spread.bid} fee is ${buyPrice * TradingComponent.FEE_MAX_RATE}`);
            buyPrice *= (1 - TradingComponent.FEE_MAX_RATE);
            this.lastBuyPrice = buyPrice;
            this.myWallet -= buyPrice;
            this.transactionDate = spread.timestamp;

            this.wannaBuy = false;
            return;
        }
        // wait latency time to buy bid and answer
        if (timePassed && !this.wannaBuy) {
            // sell one bitcoin as middle of bid ans ask + 10%
            let sellPrice = ( spread.getMiddlePrice() + spread.getPercentOfSpread(0.50 - TradingComponent.MARGIN));
            console.log(`vente de ${sellPrice} spread is ${spread.ask} ${spread.bid} fee is ${sellPrice * TradingComponent.FEE_MAX_RATE}`);
            sellPrice *= (1 - TradingComponent.FEE_MAX_RATE);

            this.myWallet += sellPrice ;
            this.transactionDate = spread.timestamp;
            this.gain += sellPrice - this.lastBuyPrice;

            this.chart.data.push({ date: spread.timestamp, name: 'name ' + spread.timestamp, value: this.gain});
            this.chart.data = [...this.chart.data];

            this.wannaBuy = true;
            return;
        }
    }

    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            this.chart = am4core.create('chartdiv', am4charts.XYChart);

            this.chart.paddingRight = 20;
            this.chart.data = [];

            const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;

            const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 10;

            const series = this.chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = 'date';
            series.dataFields.valueY = 'value';

            series.tooltipText = '{valueY.value}';
            this.chart.cursor = new am4charts.XYCursor();

            const scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            this.chart.scrollbarX = scrollbarX;
        });
    }

    public displayXBTEURSpread() {
        this.krakenService.send(
            {
                event: 'subscribe',
                pair: [
                    'XBT/EUR'
                ],
                subscription: {
                    name: 'spread'
                }
            }
        );
    }

    public sendPing() {
        this.krakenService.send(this.ping);
    }

}
