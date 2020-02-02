import {StorySummary} from '../../../shared/models/dto/stories/story-summary';

export class StorySummaryImpl extends StorySummary {

    public url = '';

    public constructor(storySummary: StorySummary) {
        super();

        this.id = storySummary.id;
        this.title = storySummary.title;
        this.url = storySummary.title.replace('.json', '');
    }

}
