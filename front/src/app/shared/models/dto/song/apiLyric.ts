import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('Lyric')
export class ApiLyric {

    @JsonProperty('sentences', [String])
    public sentences: string[] = [];
    @JsonProperty('phonetic', [String])
    public phonetic: string[] = [];
    @JsonProperty('lang', String)
    private lang: ApiLang = null;

    public getLang(): ApiLang {
        return this.lang;
    }

    public setLang(lang: string) {
        switch (lang) {
            case 'fr':
                this.lang = ApiLang.Fr;
                break;
            case 'en':
                this.lang = ApiLang.En;
                break;
            case 'cn':
                this.lang = ApiLang.Cn;
                break;
        }
    }

}
