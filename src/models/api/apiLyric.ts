import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("Lyric")
export class ApiLyric {

    @JsonProperty("lang", String)
    private _lang: ApiLang = null;

    @JsonProperty("sentences", [String])
    public sentences: string[] = [];

    @JsonProperty("phonetic", [String])
    public phonetic: string[] = [];

    public getLang(): ApiLang {
        return this._lang;
    }

    public setLang(lang: string) {
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
