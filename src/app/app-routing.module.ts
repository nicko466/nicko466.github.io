import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SongComponent} from './song/song.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SongsComponent} from './songs/songs.component';
import {HskComponent} from './hsk/hsk.component';

const routes: Routes = [
    {path: '', component: SongsComponent},
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
