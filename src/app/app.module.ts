import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SongComponent} from './song/song.component';
import {RepoService} from "../services/repo.service";
import {HttpClientModule} from "@angular/common/http";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SongsComponent} from './songs/songs.component';
import {HskComponent} from './hsk/hsk.component';

@NgModule({
    declarations: [
        AppComponent,
        SongComponent,
        PageNotFoundComponent,
        SongsComponent,
        HskComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        RepoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
