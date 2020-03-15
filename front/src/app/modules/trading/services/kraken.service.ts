import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {NextObserver, Observable, Subject} from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

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

        subject.subscribe(
            msg => console.log(msg), // Called whenever there is a message from the server.
            err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            () => console.log('complete') // Called when connection is closed (for whatever reason).
        );

        return subject;
    }
}
