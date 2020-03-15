import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TradingComponent} from './components/trading/trading.component';
import {TradingRoutingModule} from './trading-routing.module';

@NgModule({
    bootstrap: [TradingComponent],
    declarations: [TradingComponent],
    imports: [
        CommonModule,
        TradingRoutingModule,
    ]
})
export class TradingModule {
}
