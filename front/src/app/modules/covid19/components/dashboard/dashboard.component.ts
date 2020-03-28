import {AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CovidapiService} from '../../services/covidapi.service';

import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {CountryStat} from '../../models/covidapi';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DashboardService} from '../../services/dashboard.service';
import {Chart} from '../../models/chart';
import {StatType} from '../../models/stat-type.enum';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('mapanel') accordion: MatExpansionPanel;

    public countryStats: CountryStat[] = [];

    public charts: Chart[] = [];

    public myControl = new FormControl();
    public countriesSelected: string[] = ['France', 'US', 'Italy'];
    public countries: string[] = [];
    public countriesFiltered: Observable<string[]>;

    public statTypeDeathIndex: number = StatType.DEATH.valueOf();
    public startTypeConfirmedIndex: number = StatType.CONFIRMED.valueOf();
    public startTypeRecoveredIndex: number = StatType.RECOVERED.valueOf();

    constructor(
        private zone: NgZone,
        private readonly dashboardService: DashboardService,
        private readonly covidapiService: CovidapiService) {

        this.charts = [
            new Chart('deaths', StatType.DEATH, true),
            new Chart('recovered', StatType.RECOVERED, false),
            new Chart('confirmed', StatType.CONFIRMED, false),
        ];
    }

    public ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            this.charts.forEach((chart) => chart.dispose());
        });
    }

    public ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            this.charts.forEach((chart) => chart.initChart());
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
                console.log(this.countryStats);
                this.countries = this.countryStats.map((countryStat: CountryStat) => countryStat.countryName);
                this.updateCharts();
            });
    }

    private filterCountry(value: string) {
        const valueToFilter = value?.toLowerCase();

        return this.countries.filter((country) => country.toLowerCase().includes(valueToFilter));
    }

    public addCountry() {
        this.accordion.close();
        if (!this.countriesSelected.includes(this.myControl.value)) {
            this.countriesSelected.push(this.myControl.value);
            this.updateCharts();
        }
    }

    private updateCharts() {
        const filterCountryStats = this.dashboardService.getFilteredCountryStats(this.countriesSelected, this.countryStats);

        this.charts.forEach((chart) => chart.update(filterCountryStats));
    }

    changeTab(event: any) {
        this.charts.forEach((chart) => chart.isDisplay = false);

        const chartSelected = this.charts.find((chart) => chart.type === event.index);

        if (chartSelected) {
            chartSelected.isDisplay = true;
        }
    }

    removeCountry(countryName: string) {
        this.accordion.close();
        this.countriesSelected =
            this.countriesSelected.filter((countryCurrent) => countryCurrent !== countryName);
        this.updateCharts();
    }
}
