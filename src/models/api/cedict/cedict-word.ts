import {JsonObject, JsonProperty} from 'json2typescript';
import {Hanzi} from '../../hanzi';

@JsonObject('cedict')
export class CedictWord {

    @JsonProperty('traditional', String)
    public traditional: string = null;

    @JsonProperty('simplified', String)
    public simplified: string = null;

    @JsonProperty('pinyin', String)
    public pinyin: string = null;

    @JsonProperty('definitions', [String])
    public definitions: string[] = null;

    public toHanzi(): Hanzi {
        return new Hanzi(
            this.traditional,
            this.simplified,
            this.pinyin,
            this.definitions
        );
    }

}

