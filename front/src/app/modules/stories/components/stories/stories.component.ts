import {Component, OnInit} from '@angular/core';
import {StoriesService} from '../../services/stories.service';
import {JsonConvert} from 'json2typescript';
import {ApiSongs} from '../../../../shared/models/dto/song/apiSongs';
import {Stories} from '../../../../shared/models/dto/stories/stories';
import {StorySummary} from '../../../../shared/models/dto/stories/story-summary';
import {StorySummaryImpl} from '../../models/stories';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

    public storiesSummary: StorySummaryImpl[] = [];


    constructor(private storiesService: StoriesService) {
    }

    ngOnInit() {
        this.storiesService.getStories(4)
            .then((data: any) => {
            const jsonConvert: JsonConvert = new JsonConvert();
            this.storiesSummary = jsonConvert.deserializeObject(data, Stories)
                .storySummary
                .map(value => new StorySummaryImpl(value));

            console.error(this.storiesSummary);
        },
        (error) => console.error(`Failed to get data due to ${error} `)
    );
    }

}
