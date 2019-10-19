import {JsonObject, JsonProperty} from "json2typescript";
import {ApiLyric} from "./apiLyric";
import { ApiSongDescr } from './apiSongDescr';

@JsonObject("Songs")
export class ApiSongs {

  @JsonProperty("songs", [ApiSongDescr])
  public songDescr: ApiSongDescr[] = null;

}
