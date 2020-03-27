export interface CovidStat {
    date: Date;
    confirmed: number;
    deaths: number;
    recovered: number;
}

export interface CountryStat {
    countryName: string;
    data: CovidStat[];
}

export interface ChartData {
    value: number;
    date: Date;
}
