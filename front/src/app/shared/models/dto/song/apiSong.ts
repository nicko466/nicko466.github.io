import {JsonObject, JsonProperty} from 'json2typescript';
import {ApiLyric} from './apiLyric';

@JsonObject('Song')
export class ApiSong {

    @JsonProperty('title', String)
    public title: string = null;

    @JsonProperty('url', String)
    public url: string = null;

    @JsonProperty('cover', String)
    public cover: string = null;

    @JsonProperty('lyrics', [ApiLyric])
    public lyrics: ApiLyric[] = null;

}
