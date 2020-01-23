import {JsonObject, JsonProperty} from 'json2typescript';
import {ApiWord} from './word';

@JsonObject('Hsk')
export class ApiHsk {

    @JsonProperty('words', [ApiWord])
    public words: ApiWord[] = null;

}

