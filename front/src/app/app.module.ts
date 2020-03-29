import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SongComponent} from './shared/components/song/song.component';
import {RepoService} from './shared/services/repo.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {SongsComponent} from './shared/components/songs/songs.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    declarations: [
        AppComponent,
        SongComponent,
        PageNotFoundComponent,
        SongsComponent,
    ],
    imports: [
        MatMenuModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
    ],
    providers: [
        RepoService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
