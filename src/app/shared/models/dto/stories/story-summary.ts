import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('story')
export class StorySummary {

    @JsonProperty('title', String)
    public title: string = null;

    @JsonProperty('id', Number)
    public id: number = null;

}
