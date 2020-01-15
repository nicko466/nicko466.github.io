import { Component, OnInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';
import { JsonConvert } from 'json2typescript';
import { ApiSong } from '../../models/api/apiSong';
import { Song } from '../../models/song';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  public song: Song;
  public langsIsDisplayed: Map<ApiLang, boolean> = new Map<ApiLang, boolean>();

  constructor(
    private songservice: RepoService,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit() {
    let id : string = this.route.snapshot.paramMap.get("id");
    this.songservice
      .getJSON(id)
      .subscribe(
        (data: any) => {
          let jsonConvert: JsonConvert = new JsonConvert();
          let apiSong: ApiSong = jsonConvert.deserializeObject(data, ApiSong);
          this.song = new Song(apiSong);

          this.song.langs.forEach(element => {
            this.langsIsDisplayed.set(element, true);
          });

        },
        (error) => console.error(`Failed to get data due to ${error} `)
      );

  }

  public updateLangToDisplay(lang: ApiLang){
    this.langsIsDisplayed.set(lang, !this.langsIsDisplayed.get(lang));
  }

}

