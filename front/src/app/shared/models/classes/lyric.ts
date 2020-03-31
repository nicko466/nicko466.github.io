import '../dto/song/apiLang';
import {ApiLang} from '../dto/song/apiLang';

export class Lyric {

    public lang: ApiLang = null;

    public words: string[] = [];

    public phoneWords: string[] = [];

    constructor(lang: ApiLang, sentence: string, phoneWords: string) {
        this.lang = lang;
        this.words = this.extractWords(sentence, false);
        this.phoneWords = this.extractWords(phoneWords, true);
    }

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

    private extractWords(sentence: string, isPhonetic: boolean): string[] {
        if (sentence) {
            // TODO fix weird testing type here

            return this.lang.valueOf() === ApiLang.Cn && !isPhonetic ?
                sentence.replace(/\s/g, '').split('') : sentence.trim().split(/[\s,]+/);
        }

        return [];
    }

}
