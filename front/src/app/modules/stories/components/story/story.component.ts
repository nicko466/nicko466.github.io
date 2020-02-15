import {Component, OnInit} from '@angular/core';
import {Hanzi} from '../../../../shared/models/classes/hanzi';
import {RepoService} from '../../../../shared/services/repo.service';
import {JsonConvert} from 'json2typescript';
import {ActivatedRoute} from '@angular/router';
import {StoriesService} from '../../services/stories.service';
import {Story} from '../../../../shared/models/dto/stories/story';
import {MatSnackBar} from '@angular/material';

export interface HanzisTooltip {
    hanzis: Hanzi[];
    indexes: number[];
}

export enum MessageDictLoad {
    success = 'Succeed to initialize chinese dictionary, click on a chinese character to display infos',
    error = 'Failed to initialize chinese dictionary'
}

@Component({
    selector: 'app-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

    public words: string[];
    public hanzi: Hanzi[];
    public indexToHighlight: number[] = [];
    public tooltipText: string;
    public story: Story;

    constructor(
        private snackBar: MatSnackBar,
        private storiesService: StoriesService,
        private repoService: RepoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        const id: string = this.route.snapshot.paramMap.get('id');

        this.storiesService.getStory(`${id}`, 4)
            .then((data: any) => {
                    const jsonConvert: JsonConvert = new JsonConvert();
                    this.story = jsonConvert.deserializeObject(data, Story);

                    this.words = this.story.text.match(/./g);
                },
                (error) => console.error(`Failed to get data due to ${error} `)
            );

        this.storiesService.initCedict()
            .then((hanzis: Hanzi[]) => {
                this.hanzi = hanzis;
                this.displaySnackBar(MessageDictLoad.success);
            }).catch(reason =>
                this.displaySnackBar(MessageDictLoad.error)
        );
    }

    public updateTooltip(wordIndex: number) {
        const hanzisTooltip: HanzisTooltip = this.storiesService.getHanzisTooltip(this.hanzi, this.words, wordIndex, 4);
        this.tooltipText = this.storiesService.formatHanzis(hanzisTooltip.hanzis);
        this.indexToHighlight = hanzisTooltip.indexes;
    }


    private displaySnackBar(message: MessageDictLoad) {
        this.snackBar.open(message, 'Close', { duration : 3000});
    }
}

