import {Component, OnInit} from '@angular/core';
import {RepoService} from '../../services/repo.service';
import {JsonConvert} from 'json2typescript';
import {ApiSongs} from '../../models/dto/song/apiSongs';

@Component({
    selector: 'app-songs',
    templateUrl: './songs.component.html',
    styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit {

    public songs: ApiSongs;

    constructor(
        private songservice: RepoService,
    ) {
    }

    ngOnInit() {
        this.songservice
            .getSong('songs')
            .subscribe(
                (data: any) => {
                    const jsonConvert: JsonConvert = new JsonConvert();
                    this.songs = jsonConvert.deserializeObject(data, ApiSongs);

                    console.error(this.songs);
                },
                (error) => console.error(`Failed to get data due to ${error} `)
            );

    }

}
