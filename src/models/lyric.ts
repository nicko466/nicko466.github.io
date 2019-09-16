export class Lyric {

  private _lang: ApiLang = null;

  public words: string[] = [];

  constructor(_lang, sentences) {
    this._lang = _lang;
    this.words = sentences
      .replace(/\s/g, "")
      .split(",");
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
