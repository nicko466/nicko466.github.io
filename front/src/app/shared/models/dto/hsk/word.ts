import {JsonObject, JsonProperty} from 'json2typescript';
import {Hanzi} from '../../classes/hanzi';

@JsonObject('word')
export class ApiWord {

    @JsonProperty('hanzi', String)
    public hanzi = '';
    @JsonProperty('pinyin', String)
    public pinyin = '';
    @JsonProperty('translations', [String])
    public translations: string[] = [];
    @JsonProperty('id', Number)
    // tslint:disable-next-line:ban-types
    private id: Number = 0;

    public toHanzi(): Hanzi {
        return new Hanzi(
            '',
            this.hanzi,
            this.pinyin,
            this.translations
        );
    }


}
