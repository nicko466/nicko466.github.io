import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StoriesService {

    constructor(private httpClient: HttpClient) {}

    public getStories(hsk: number): Promise<any> {
        return this.httpClient.get(`./assets/stories/hsk${hsk}/stories.json`).toPromise();
    }

    public getStory(storyTitle: string, hsk: number): Promise<any> {
        return this.httpClient.get(`./assets/stories/hsk${hsk}/${storyTitle}.json`).toPromise();
    }

}
