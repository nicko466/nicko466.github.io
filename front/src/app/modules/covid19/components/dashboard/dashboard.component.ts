import { NgZone, Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {CovidapiService} from '../../services/covidapi.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {ChartData, CountryStat, CovidStat} from '../../models/covidapi';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy  {

    public countryStats: CountryStat[];
    private chartRecov: am4charts.XYChart;
    private chartDeath: am4charts.XYChart;
    private chartConfirm: am4charts.XYChart;

    constructor(
        private zone: NgZone,
        private readonly covidapiService: CovidapiService) {
    }

    public ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            if (this.chartRecov) {
                this.chartRecov.dispose();
            }
            if (this.chartConfirm) {
                this.chartConfirm.dispose();
            }
            if (this.chartDeath) {
                this.chartDeath.dispose();
            }
        });
    }

    public ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            this.chartDeath = this.initChart('deaths');
            this.chartConfirm = this.initChart('recovered');
            this.chartRecov = this.initChart('confirmed');
        });
    }

    public ngOnInit(): void {
        this.covidapiService.getData()
            .subscribe((data: any) => {
                this.countryStats = data;

                this.countryStats
                    .forEach((countryStat: CountryStat) => {
                        this.initSeries(
                            'recovered',
                            countryStat.countryName,
                            this.chartRecov,
                            countryStat.data.map((stat) => ({date: stat.date, value: stat.recovered})));
                    });

                this.countryStats
                    .forEach((countryStat: CountryStat) => {
                        this.initSeries(
                            'deaths',
                            countryStat.countryName,
                            this.chartDeath,
                            countryStat.data.map((stat) => ({date: stat.date, value: stat.deaths})));
                    });

                this.countryStats
                    .forEach((countryStat: CountryStat) => {
                        this.initSeries(
                            'confirmed',
                            countryStat.countryName,
                            this.chartConfirm,
                            countryStat.data.map((stat) => ({date: stat.date, value: stat.confirmed})));
                    });

            });
    }

    private initSeries(info: string, country: string, chart: any, chartData: ChartData[]) {
        const series = chart.series.push(new am4charts.LineSeries());
        series.name = 'date';
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

    private initChart(charHtmlName: string): any {
        const chart = am4core.create(charHtmlName, am4charts.XYChart);

        chart.paddingRight = 20;
        chart.data = [];

        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 10;
        chart.cursor = new am4charts.XYCursor();

        const scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX = scrollbarX;

        return chart;
    }

}
