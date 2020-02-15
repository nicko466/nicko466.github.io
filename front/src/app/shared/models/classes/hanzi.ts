export class Hanzi {

    public traditional = '';
    public simplified = '';
    public pinyin = '';
    public translation: string[] = [];

    public constructor(
        traditional: string,
        simplified: string,
        pinyin: string,
        translation: string[],
    ) {
        this.traditional = traditional;
        this.simplified = simplified;
        this.pinyin = pinyin;
        this.translation = translation;
    }

    public toString(): string {
        return `${this.simplified}\n${this.pinyin}\n ${this.translation.join(' ')}`;
    }

}
