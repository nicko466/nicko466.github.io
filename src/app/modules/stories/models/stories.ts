import {StorySummary} from '../../../shared/models/dto/stories/story-summary';

export class StorySummaryImpl extends StorySummary {

    public url = '';

    public constructor(storySummary: StorySummary) {
        super();

        this.id = storySummary.id;
        this.fileName = storySummary.fileName;
        this.url = storySummary.fileName.replace('.json', '');
    }

}
