import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoryComponent} from './components/story/story.component';
import {StoriesComponent} from './components/stories/stories.component';

const routes: Routes = [
    {path: ':id', component: StoryComponent},
    {path: '', component: StoriesComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoriesRoutingModule {
}
