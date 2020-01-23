import {JsonObject, JsonProperty} from "json2typescript";
import {Hanzi} from '../../hanzi';

@JsonObject("word")
export class ApiWord {

    @JsonProperty("id", Number)
    private id: Number = 0;

    @JsonProperty("hanzi", String)
    public hanzi: string = "";

    @JsonProperty("pinyin", String)
    public pinyin: string = "";

    @JsonProperty("translations", [String])
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
