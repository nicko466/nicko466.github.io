import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CountryStat, CovidStat} from '../models/covidapi';
import { map } from 'rxjs/operators';
import {DataHubDto} from '../models/datahubDto';

@Injectable({
    providedIn: 'root'
})
export class CovidapiService {

    constructor(private http: HttpClient) {
    }

    public getData(): Observable<CountryStat[]> {
        // https://datahub.io/core/covid-19/r/time-series-19-covid-combined.json
        // return this.http.get(`https://pomber.github.io/covid19/timeseries.json`).pipe(
        // return this.http.get(`assets/covid/timeseries.json`).pipe(
        return this.http.get(`https://datahub.io/core/covid-19/r/countries-aggregated.json`).pipe(
                map((data) => this.mapFromDataHub(data as DataHubDto[]))
            );
    }

    public mapFromDataHub(dataHubDtos: DataHubDto[]): CountryStat[] {
        const countriesStat: CountryStat[] = [];

        dataHubDtos
            .forEach((dataHubDto) => {
            let countryStat = countriesStat.find((countryStatCur) => countryStatCur.countryName === dataHubDto['Country/Region']);
            if (!countryStat) {
                countryStat = {
                    countryName: dataHubDto['Country/Region'],
                    data: [],
                };
                countriesStat.push(countryStat);
            }
            countryStat.data.push({
                date: new Date(dataHubDto.Date),
                confirmed: dataHubDto.Confirmed,
                deaths: dataHubDto.Deaths,
                recovered: dataHubDto.Recovered,
            });
        });

        return countriesStat;
    }

    public mapFromPlomber(countries: any): CountryStat[] {
        const countriesStat: CountryStat[] = [];
        // tslint:disable-next-line:forin
        for (const countryName in countries) {
            const covidStats: any[] = countries[countryName];
            const data: CovidStat[] = covidStats.map(covidStat => {
                return {
                    date: new Date(covidStat.date),
                    confirmed: covidStat.confirmed,
                    deaths: covidStat.deaths,
                    recovered: covidStat.recovered,
                };
            });

            countriesStat.push({countryName, data});
        }

        return countriesStat;
    }

}
