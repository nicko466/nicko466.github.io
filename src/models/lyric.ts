import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("Lyric")
export class Lyric {

  @JsonProperty("lang", String)
  private _lang: Lang = null;

  @JsonProperty("sentences", [String])
  public sentences: string[] = [];

  public getLang(): Lang{
    return this._lang;
  }

  public setLang(lang: string){
    switch (lang) {
      case "fr":
        this._lang = Lang.Fr;
        break;
      case "en":
        this._lang = Lang.En;
        break;
      case "cn":
        this._lang = Lang.Cn;
        break;
    }
  }

}
