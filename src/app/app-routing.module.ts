import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SongComponent} from './song/song.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HskComponent} from './hsk/hsk.component';
import {SongsComponent} from './songs/songs.component';

const routes: Routes = [
    {path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {path: 'songs', component: SongsComponent},
    {path: 'songs/:id', component: SongComponent},
    {path: 'hsk', component: HskComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
