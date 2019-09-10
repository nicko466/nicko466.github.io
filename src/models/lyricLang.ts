import {Sentence} from "./sentence";

export class LyricLang {

  private _lang: ApiLang = null;

  public sentences: string[] = [];

  constructor(_lang, sentences) {
    this._lang = _lang;
    this.sentences = sentences.split(",");
  }

  public getLang(): ApiLang{
    return this._lang;
  }

  public setLang(lang: string){
    switch (lang) {
      case "fr":
        this._lang = ApiLang.Fr;
        break;
      case "en":
        this._lang = ApiLang.En;
        break;
      case "cn":
        this._lang = ApiLang.Cn;
        break;
    }
  }

}
