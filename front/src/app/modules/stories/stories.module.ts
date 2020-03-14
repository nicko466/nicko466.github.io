import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoriesRoutingModule} from './stories-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';

import 'hammerjs';

import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {HammerInstance} from '@angular/material/core';
import {StoryComponent} from './components/story/story.component';
import { StoriesComponent } from './components/stories/stories.component';
import {StoriesService} from './services/stories.service';
import { MatSnackBar, MatSnackBarContainer, MatSnackBarModule } from '@angular/material/snack-bar';

declare var Hammer: any;

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
    buildHammer(element: HTMLElement): HammerInstance {
        return new Hammer(element, {
            touchAction: 'auto'
        });
    }
}

@NgModule({
    declarations: [
        StoryComponent,
        StoriesComponent,
    ],
    imports: [
        MatSnackBarModule,
        MatTooltipModule,
        CommonModule,
        StoriesRoutingModule,
    ],
    providers: [
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig
        },
        MatSnackBar,
        StoriesService,
    ]
})
export class StoriesModule {
}
