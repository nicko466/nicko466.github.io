import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('story')
export class Story {

    @JsonProperty('title', String)
    public title: string = null;

    @JsonProperty('imageUrl', String)
    public imageUrl: string = null;

    @JsonProperty('url', String)
    public url: string = null;

    @JsonProperty('text', String)
    public text: string = null;

}
