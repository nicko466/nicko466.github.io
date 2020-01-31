import './api/song/apiLang';

export class Lyric {

    public lang: ApiLang = null;

    public words: string[] = [];

    public phoneWords: string[] = [];

    constructor(lang: ApiLang, sentence: string, phoneWords: string) {
        this.lang = lang;
        this.words = this.extractWords(sentence);
        this.phoneWords = this.extractWords(phoneWords);
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

    private extractWords(sentence: string): string[] {
        return sentence != null ?
            sentence
                .replace(/\s/g, '')
                .split(',') : [];
    }

}
