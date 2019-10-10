export class Lyric {

  public lang: ApiLang = null;

  public words: string[] = [];

  constructor(lang, sentences) {
    this.lang = lang;
    this.words = sentences
      .replace(/\s/g, "")
      .split(",");
  }

  public getLang(): ApiLang{
    return this.lang;
  }

  public setLang(lang: string){
    switch (lang) {
      case "fr":
        this.lang = ApiLang.Fr;
        break;
      case "en":
        this.lang = ApiLang.En;
        break;
      case "cn":
        this.lang = ApiLang.Cn;
        break;
    }
  }

}
