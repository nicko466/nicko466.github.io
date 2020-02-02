import {JsonObject, JsonProperty} from 'json2typescript';
import {Hanzi} from '../../hanzi';

@JsonObject('word')
export class ApiWord {

    @JsonProperty('id', Number)
    // tslint:disable-next-line:ban-types
    private id: Number = 0;

    @JsonProperty('hanzi', String)
    public hanzi = '';

    @JsonProperty('pinyin', String)
    public pinyin = '';

    @JsonProperty('translations', [String])
    public translations: string[] = [];


    public toHanzi(): Hanzi {
        return new Hanzi(
            '',
            this.hanzi,
            this.pinyin,
            this.translations
        );
    }


}
