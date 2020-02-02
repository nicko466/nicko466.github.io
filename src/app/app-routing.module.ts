import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SongComponent} from './shared/components/song/song.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {SongsComponent} from './shared/components/songs/songs.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'stories',
        loadChildren: () => import('./modules/stories/stories.module').then(m => m.StoriesModule)
    },
    {path: 'songs', component: SongsComponent},
    {path: 'songs/:id', component: SongComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
