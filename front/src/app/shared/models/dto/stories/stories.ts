import {JsonObject, JsonProperty} from 'json2typescript';
import {StorySummary} from './story-summary';

@JsonObject('stories')
export class Stories {

    @JsonProperty('stories', [StorySummary])
    public storySummary: StorySummary[] = null;

}
