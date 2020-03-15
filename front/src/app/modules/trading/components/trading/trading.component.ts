import {Component, OnInit} from '@angular/core';
import {KrakenService} from '../../services/kraken.service';
import {Subject} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-trading',
    templateUrl: './trading.component.html',
    styleUrls: ['./trading.component.scss']
})
export class TradingComponent {

    wsSubscription: Subject<MessageEvent>;

    constructor(private readonly  krakenService: KrakenService) {
        krakenService.connect(environment.kraken.ws);
    }

    private ping = {
        event: 'ping',
        reqid: 42
    };

    displayXBTEUR() {
        this.krakenService.send(
            {
                event: 'subscribe',
                pair: [
                    'XBT/EUR'
                ],
                subscription: {
                    interval: 30,
                    name: 'ohlc'
                }
            }
        );
    }

    sendPing() {
        this.krakenService.send(this.ping);
    }

}
