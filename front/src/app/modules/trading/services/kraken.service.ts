import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import { NextObserver, Observable, Subject} from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import {Spread} from '../objects/spread';

import { filter, map } from 'rxjs/operators';


export interface IAuthent {
    event: string;
    subscription: {
        name: string;
        token: string;
    };
}


@Injectable({
    providedIn: 'root'
})
export class KrakenService {

    private subject: Subject<any>;

    constructor() {
        console.log(environment.kraken.ws);
    }

    public connect(url): Subject<any> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log('Successfully connected: ' + url);
        }
        return this.subject;
    }

    public send(message: any) {
        return this.subject.next(message);
    }

    public getSpread(): Observable<Spread> {
        return this.subject.pipe(
            filter((data: any) => data[2] === 'spread'),
            map((spreadData) => new Spread(spreadData[1])),
            // map((spread: Spread) => spread.getProfit(1.26)),
        );
    }

    public authent(token) {
        const authent: IAuthent = {
            event: 'subscribe',
            subscription: {
                name: 'ownTrades',
                token
            }
        };
        this.subject.next(authent);
    }

    private create(url: string): Subject<any> {
        const subject = webSocket(url);
        return subject;
    }
}
