import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('Lyric')
export class ApiLyric {

    @JsonProperty('sentences', [String])
    public sentences: string[] = [];
    @JsonProperty('phonetic', [String])
    public phonetic: string[] = [];
    @JsonProperty('lang', String)
    public lang: string = null;

}
