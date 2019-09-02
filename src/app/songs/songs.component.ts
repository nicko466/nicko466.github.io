import {Component, OnInit} from '@angular/core';
import {Song} from "../../models/song";
import {SongService} from "../../services/song.service";
import {JsonConvert} from "json2typescript";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit {

  public songs: Song[]= [];

  constructor(
    private songservice: SongService,
  ) { }

  ngOnInit() {
    this.songservice
      .getJSON()
      .subscribe(
        (data: any) => {
          let jsonConvert: JsonConvert = new JsonConvert();
          let song: Song = jsonConvert.deserializeObject(data, Song);
          console.log(song);
          this.songs.push(song);
        },
        (error) => console.error(`Failed to get data due to ${error} `)
      );

  }


  public displayMultipleLang(song: Song){


  }


}
