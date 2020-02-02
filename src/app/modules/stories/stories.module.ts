import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoriesComponent} from './components/stories/stories.component';
import {StoriesRoutingModule} from './stories-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [StoriesComponent],
    imports: [
        MatTooltipModule,
        CommonModule,
        StoriesRoutingModule
    ],
    providers: []
})
export class StoriesModule {
}
