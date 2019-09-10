import {LyricLang} from "./lyricLang";
import {ApiSong} from "./apiSong";

export class Lyric {

  public lyricLang: LyricLang[] = []

  constructor(lang: ApiLang, sentence: string){
    this.lyricLang.push(new LyricLang(lang, sentence))
  }

}
