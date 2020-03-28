import { Injectable } from '@angular/core';
import {CountryStat} from '../models/covidapi';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

    getFilteredCountryStats(countriesFiltered: string[], countryStats: CountryStat[]): CountryStat[] {
      return countryStats
          .filter((countryStatsCurrent: CountryStat) => countriesFiltered.includes(countryStatsCurrent.countryName));
    }
}
