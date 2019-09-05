import {JsonObject, JsonProperty} from "json2typescript";
import {Lyric} from "./lyric";

@JsonObject("Song")
export class Song {

  @JsonProperty("title", String)
  public title: string = null;

  @JsonProperty("url", String)
  public url: string = null;

  @JsonProperty("lyrics", [Lyric])
  public lyrics: Lyric[] = null;

}
