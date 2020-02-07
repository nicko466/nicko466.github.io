import {JsonObject, JsonProperty} from 'json2typescript';
import {CedictWord} from './cedict-word';

@JsonObject('cedictWord')
export class Cedict {

    @JsonProperty('cedictWord', [CedictWord])
    public cedictWord: CedictWord[] = null;

}

