import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('story')
export class StorySummary {

    @JsonProperty('fileName', String)
    public fileName: string = null;

    @JsonProperty('id', Number)
    public id: number = null;

}
