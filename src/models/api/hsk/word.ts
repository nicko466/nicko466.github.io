import {JsonObject, JsonProperty} from "json2typescript";

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

    public toString(): string {
        return `${this.hanzi}\n${this.pinyin}\n${this.translations}`;
    }

}
