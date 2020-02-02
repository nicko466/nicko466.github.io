import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoriesComponent} from './components/stories/stories.component';
import {StoriesRoutingModule} from './stories-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';

import 'hammerjs';

import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
    overrides = {
        pinch: { enable: false },
        rotate: { enable: false }
    } as any;
}

@NgModule({
    declarations: [StoriesComponent],
    imports: [
        MatTooltipModule,
        CommonModule,
        StoriesRoutingModule
    ],
    providers: [
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig
        },
    ]
})
export class StoriesModule {
}
