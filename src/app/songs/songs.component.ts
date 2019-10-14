import {Component, OnInit} from '@angular/core';
import {ApiSong} from "../../models/apiSong";
import {SongService} from "../../services/song.service";
import {JsonConvert} from "json2typescript";
import {Song} from "../../models/song";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit {

  public song: Song;
  public langsIsDisplayed: Map<ApiLang, boolean> = new Map<ApiLang, boolean>();

  constructor(
    private songservice: SongService,
  ) {
  }

  ngOnInit() {
    this.songservice
      .getJSON()
      .subscribe(
        (data: any) => {
          let jsonConvert: JsonConvert = new JsonConvert();
          let apiSong: ApiSong = jsonConvert.deserializeObject(data, ApiSong);
          this.song = new Song(apiSong);

          this.song.langs.forEach(element => {
            this.langsIsDisplayed.set(element, true);
          });

          // this.sentences = this.getSentences(this.apiSong);
          // this.numberOfLang = this.getNumberOfLang(this.apiSong);
          // this.numberOfSentences = this.getNumberOfSentences(this.apiSong);
        },
        (error) => console.error(`Failed to get data due to ${error} `)
      );

  }

  public updateLangToDisplay(lang: ApiLang){
    this.langsIsDisplayed.set(lang, !this.langsIsDisplayed.get(lang));
  }

  public getSentences(song: ApiSong): String[][] {
    return song.lyrics
      .map((value) => value.sentences);
  }

  public getNumberOfLang(song: ApiSong): number {
    let lyrics: string[][] = song.lyrics
      .map((value) => value.sentences);

    if (Array.isArray(lyrics) && lyrics.length > 0) {
      return lyrics.length;
    }

    return 0;
  }

  public getNumberOfSentences(song: ApiSong): number {
    let lyrics: string[][] = song.lyrics
      .map((value) => value.sentences);

    if (Array.isArray(lyrics) && lyrics.length > 0) {

      if (Array.isArray(lyrics[0]) && lyrics[0].length > 0) {
        return lyrics[0].length;
      }
    }

    return 0;
  }

}
