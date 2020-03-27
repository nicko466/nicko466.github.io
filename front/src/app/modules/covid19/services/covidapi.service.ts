import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CountryStat, CovidStat} from '../models/covidapi';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CovidapiService {

    constructor(private http: HttpClient) {
    }

    public getData(): Observable<CountryStat[]> {
        // return this.http.get(`https://pomber.github.io/covid19/timeseries.json`).pipe(
        return this.http.get(`assets/covid/timeseries.json`).pipe(
                map((data) => this.map(data))
            );
    }

    public map(countries: any): CountryStat[] {
        const countriesStat: CountryStat[] = [];

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
