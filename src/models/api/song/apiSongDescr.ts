import {JsonObject, JsonProperty} from "json2typescript";
import {ApiLyric} from "./apiLyric";

@JsonObject("SongDescr")
export class ApiSongDescr {

    @JsonProperty("id", String)
    public id: string = null;

    @JsonProperty("cover", String)
    public cover: string = null;

    @JsonProperty("title", String)
    public title: string = null;

    @JsonProperty("details", String)
    public details: string = null;

    @JsonProperty("artist", String)
    public artist: string = null;
}
