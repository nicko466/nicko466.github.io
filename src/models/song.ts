import {JsonObject, JsonProperty} from "json2typescript";
import {Lyric} from "./lyric";

@JsonObject("Song")
export class Song {

  @JsonProperty("title", String)
  private title: String = null;

  @JsonProperty("url", String)
  public url: String = null;

  @JsonProperty("lyrics", [Lyric])
  public lyrics: Lyric[] = null;

}
