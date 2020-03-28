import { NgZone, Component, OnInit, AfterViewInit, OnDestroy, OnChanges} from '@angular/core';
import {CovidapiService} from '../../services/covidapi.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {ChartData, CountryStat, CovidStat} from '../../models/covidapi';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {DashboardService} from '../../services/dashboard.service';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

    public countryStats: CountryStat[] = [];
    private chartRecov: am4charts.XYChart;
    public chartDeathsHide: boolean = false;
    public chartRecoveredHide: boolean = true;
    public chartConfirmedHide: boolean = true;
    private chartDeath: am4charts.XYChart;
    private chartConfirm: am4charts.XYChart;


    public myControl = new FormControl();
    public countriesSelected: string[] = ['France', 'China'];
    public countries: string[] = [];
    public countriesFiltered: Observable<string[]>;

    constructor(
        private zone: NgZone,
        private readonly dashboardService: DashboardService,
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
            this.updateCharts();
        });
    }

    public ngOnInit(): void {
        this.countriesFiltered = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this.filterCountry(value))
            );

        this.covidapiService.getData()
            .subscribe((data: any) => {
                this.countryStats = data;
                this.countries = this.countryStats.map((countryStat: CountryStat) => countryStat.countryName);
                this.updateCharts();
            });
    }

    private filterCountry(value: string) {
        const valueToFilter = value?.toLowerCase();

        return this.countries.filter((country) => country.toLowerCase().includes(valueToFilter));
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

    addCountry() {
        if (!this.countriesSelected.includes(this.myControl.value)) {
            this.countriesSelected.push(this.myControl.value);
            this.updateCharts();
        }
    }

    private updateCharts() {
        const filterCountryStats = this.dashboardService.getFilteredCountryStats(this.countriesSelected, this.countryStats);

        this.chartRecov.data = [];
        filterCountryStats
            .forEach((countryStat: CountryStat) => {
                this.initSeries(
                    'recovered',
                    countryStat.countryName,
                    this.chartRecov,
                    countryStat.data.map((stat) => ({date: stat.date, value: stat.recovered})));
            });

        this.chartDeath.data = [];
        filterCountryStats
            .forEach((countryStat: CountryStat) => {
                this.initSeries(
                    'deaths',
                    countryStat.countryName,
                    this.chartDeath,
                    countryStat.data.map((stat) => ({date: stat.date, value: stat.deaths})));
            });

        this.chartConfirm.data = [];
        filterCountryStats
            .forEach((countryStat: CountryStat) => {
                this.initSeries(
                    'confirmed',
                    countryStat.countryName,
                    this.chartConfirm,
                    countryStat.data.map((stat) => ({date: stat.date, value: stat.confirmed})));
            });
    }

    changeTab(event: any) {
        this.chartDeathsHide = true;
        this.chartRecoveredHide = true;
        this.chartConfirmedHide = true;

        switch (event.index) {
            case 0:
                this.chartDeathsHide = false;
                break;
            case 1:
                this.chartRecoveredHide = false;
                break;
            case 2:
                this.chartConfirmedHide = false;
                break;
        }

    }

    removeCountry(countryName: string) {
        this.countriesSelected  =
            this.countriesSelected.filter((countryCurrent) => countryCurrent !== countryName);
        this.updateCharts();
    }
}
