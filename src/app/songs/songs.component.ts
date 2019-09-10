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

  public apiSong: ApiSong;
  public song: Song;

  public sentences: String[][];
  public url: string;
  public title: string;

  public numberOfLang: number = 0;
  public numberOfSentences: number = 0;

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
          this.apiSong = jsonConvert.deserializeObject(data, ApiSong);
          this.song = new Song(this.apiSong);

          console.log("test" + this.song);

          // this.displayMultipleLang(apiSong);
          this.url = this.apiSong.url;
          this.title = this.apiSong.title;
          this.sentences = this.getSentences(this.apiSong);
          this.numberOfLang = this.getNumberOfLang(this.apiSong);
          this.numberOfSentences = this.getNumberOfSentences(this.apiSong);
        },
        (error) => console.error(`Failed to get data due to ${error} `)
      );

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


  // public displayMultipleLang(apiSong: Song): string[] {
  //   let lyrics: string[][] = apiSong.lyrics
  //     .map((value) => value.sentences);
  //
  //   let result: string[] = [];
  //   let numberOflang: number = 0;
  //   let numberOfSentences: string[] = [];
  //   if (Array.isArray(lyrics) && lyrics.length > 0) {
  //     numberOflang = lyrics.length;
  //
  //     if (Array.isArray(lyrics[0]) && lyrics[0].length > 0) {
  //       numberOfSentences = lyrics[0].length;
  //     }
  //   }
  //
  //   for (var indexSentence = 0; indexSentence < numberOfSentences; indexSentence++) {
  //
  //     for (var indexLang = 0; indexLang < numberOflang; indexLang++) {
  //
  //       result.push(lyrics[indexLang][indexSentence]);
  //     }
  //
  //   }
  //
  //   return result;
  // }


}
