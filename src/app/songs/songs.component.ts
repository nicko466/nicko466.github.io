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
          this.song = jsonConvert.deserializeObject(data, Song);
          // this.displayMultipleLang(song);
          this.url = this.song.url;
          this.title = this.song.title;
          this.sentences = this.getSentences(this.song);
          this.numberOfLang = this.getNumberOfLang(this.song);
          this.numberOfSentences = this.getNumberOfSentences(this.song);
          console.log(this.sentences);
          console.log(this.sentences[0][0]);
          console.log(this.sentences[1][0]);
          console.log(this.sentences[2][0]);
          console.log(this.sentences[0][1]);
          console.log(this.sentences[1][2]);
        },
        (error) => console.error(`Failed to get data due to ${error} `)
      );

  }

  public getSentences(song: Song): String[][] {
    return song.lyrics
      .map((value) => value.sentences);
  }

  public getNumberOfLang(song: Song): number {
    let lyrics: string[][] = song.lyrics
      .map((value) => value.sentences);

    if (Array.isArray(lyrics) && lyrics.length > 0) {
      return lyrics.length;
    }

    return 0;
  }

  public getNumberOfSentences(song: Song): number {
    let lyrics: string[][] = song.lyrics
      .map((value) => value.sentences);

    if (Array.isArray(lyrics) && lyrics.length > 0) {

      if (Array.isArray(lyrics[0]) && lyrics[0].length > 0) {
        return lyrics[0].length;
      }
    }

    return 0;
  }


  // public displayMultipleLang(song: Song): string[] {
  //   let lyrics: string[][] = song.lyrics
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
