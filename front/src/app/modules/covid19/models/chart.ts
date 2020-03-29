import {StatType} from './stat-type.enum';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {ChartData, CountryStat, CovidStat} from './covidapi';
import {EvolveEnum} from './evolve.enum';

export class Chart {

    chartHtmlId: string;
    chart: am4charts.XYChart;
    type: StatType;
    isDisplay: boolean;

    constructor(chartHtmlId: string, type: StatType, isDisplay: boolean) {
        this.chartHtmlId = chartHtmlId;
        this.type = type;
        this.isDisplay = isDisplay;
    }

    public initChart() {
        this.chart = am4core.create(this.chartHtmlId, am4charts.XYChart);

        this.chart.paddingRight = 50;
        this.chart.paddingLeft = 20;
        this.chart.data = [];
        this.chart.legend = new am4charts.Legend();


        const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 10;
        this.chart.cursor = new am4charts.XYCursor();

        const scrollbarX = new am4charts.XYChartScrollbar();
        this.chart.scrollbarX = scrollbarX;
    }

    public update(filterCountryStats: CountryStat[], evolution: EvolveEnum): void {
        this.chart.data = [];
        filterCountryStats
            .forEach((countryStat: CountryStat) => {
                let extractedStat = this.extractStat(countryStat.data);
                extractedStat = this.applyEvolve(extractedStat, evolution);

                this.initSeries(
                    this.chartHtmlId,
                    countryStat.countryName,
                    this.chart,
                    extractedStat);
            });
    }

    public extractStat(covdistat: CovidStat[]): ChartData[] {
        const floor = 20;
        let floorStat: CovidStat;

        // TODO improved here dirty code use inheritance
        switch (this.type) {
            case StatType.CONFIRMED:
                floorStat = covdistat.find((stat) => stat.confirmed >= floor);

                return covdistat
                    .filter((stat) => (stat.date.getTime() >= floorStat?.date?.getTime()))
                    .map((stat) => ({date: stat.date, value: stat.confirmed}));
            case StatType.DEATH:
                floorStat = covdistat.find((stat) => stat.deaths >= floor);

                return covdistat
                    .filter((stat) => (stat.date.getTime() >= floorStat?.date?.getTime()))
                    .map((stat) => ({date: stat.date, value: stat.deaths}));
            case StatType.RECOVERED:
                floorStat = covdistat.find((stat) => stat.recovered >= floor);

                return covdistat
                    .filter((stat) => (stat.date.getTime() >= floorStat?.date?.getTime()))
                    .map((stat) => ({date: stat.date, value: stat.recovered}));
        }
    }

    public initSeries(info: string, country: string, chart: any, chartData: ChartData[]) {
        const series = chart.series.push(new am4charts.LineSeries());
        series.name = country;
        series.dataFields.dateX = 'date';
        series.dataFields.valueY = 'value';

        series.tooltipText = info + ' in ' + country  + ' :{valueY.value}';
        chart.cursor = new am4charts.XYCursor();

        const scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);

        chartData
            .forEach((stat: ChartData) => {
                series.data.push({ date: stat.date, name: 'name ' , value: stat.value});
            });
    }

    public dispose() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    private applyEvolve(extractedStats: ChartData[], evolution: EvolveEnum) {
        if (evolution.valueOf() === EvolveEnum.DAYBYDAY) {

            const newData = [];
            newData.push(extractedStats[1]);

            // tslint:disable-next-line:prefer-for-of
            for (let i = 1; i < extractedStats.length; i++) {
                newData.push({
                    date: extractedStats[i].date,
                    value: extractedStats[i].value - extractedStats[i - 1].value,
                });
            }
            return newData;
        }

        return extractedStats;
    }
}

