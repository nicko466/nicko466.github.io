import {Component, OnInit} from '@angular/core';
import {Hanzi} from '../../../../shared/models/classes/hanzi';
import {RepoService} from '../../../../../services/repo.service';
import {ApiHsk} from '../../../../shared/models/dto/hsk/hsk';
import {JsonConvert} from 'json2typescript';
import {Cedict} from '../../../../shared/models/dto/cedict/cedict';
import {CedictWord} from '../../../../shared/models/dto/cedict/cedict-word';
import {ActivatedRoute} from '@angular/router';
import {StoriesService} from '../../services/stories.service';
import {Story} from '../../../../shared/models/dto/stories/story';

export interface WordsFound {
    hanzis: Hanzi[];
    indexes: number[];
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

        // this.initAllHsks();

        this.initCedict();
    }

    public updateTooltip(wordIndex: number) {
        this.tooltipText = this.getUniqueElement(wordIndex, 4);
    }


    private getUniqueElement(wordIndex: number, wordMaxSize: number): string {
        // get words that contains the word
        const wordsCandidate: Hanzi[] = this.hanzi
            .filter((wordEl: Hanzi) => wordEl.simplified.includes(this.words[wordIndex]));

        if (wordsCandidate.length !== 0) {
            let candidate: WordsFound = null;
            for (let wordSize: number = wordMaxSize; wordSize !== 0; wordSize--) {
                candidate = this.getCandidate(wordIndex, wordSize, wordsCandidate);

                if (candidate != null) {
                    this.indexToHighlight = candidate.indexes;
                    return this.formatHanzis(candidate.hanzis);
                }
            }

        }

        this.indexToHighlight = [];
        console.error(`Failed to find translation for the hanzi ${this.words[wordIndex]}`);
        return 'NA';
    }

    private getCandidate(wordPosition: number, wordSize: number, wordsCandidate: Hanzi[]): WordsFound {
        const wordFound: WordsFound = {
            indexes: [],
            hanzis: []
        };

        const maxIndex = wordPosition + wordSize > this.words.length ?
            this.words.length : wordPosition + wordSize;

        let hanzis: Hanzi[] = this.getWord(wordPosition, maxIndex, wordsCandidate);

        if (hanzis.length > 0) {
            wordFound.hanzis = hanzis;
            wordFound.indexes =
                Array.from({length: maxIndex - wordPosition}, (v, k) => k + wordPosition);

            return wordFound;
        }

        const minusIndex = wordSize - wordPosition > 0 || this.words.length < wordSize ?
            0 : wordPosition - wordSize;

        hanzis = this.getWord(minusIndex, wordPosition + 1, wordsCandidate);

        if (hanzis.length > 0) {
            wordFound.hanzis = hanzis;
            wordFound.indexes =
                Array.from({length: wordPosition + 1 - minusIndex}, (v, k) => k + minusIndex);

            return wordFound;
        }

        return null;
    }

    private getWord(idx0: number, idx1: number, wordsCandidate: Hanzi[]): Hanzi[] {
        const subWords: string = this.words.slice(idx0, idx1).join('');

        return wordsCandidate.filter((value) => value.simplified === subWords);
    }

    private initAllHsks() {
        let hskLevel = 1;
        const hskPromise: Promise<any>[] = [];
        for (hskLevel = 1; hskLevel < 6; hskLevel++) {
            hskPromise.push(this.repoService.getHSK(hskLevel.toString()));
        }

        Promise.all(
            hskPromise
        ).then(
            (data: any[]) => {
                const tmp: ApiHsk[] = [];
                const jsonConvert: JsonConvert = new JsonConvert();
                for (const hskElement of data) {
                    tmp.push(jsonConvert.deserializeObject(hskElement, ApiHsk));
                }
                this.hanzi = tmp.flatMap((value, index) =>
                    value.words.map((apiWord, index1) => apiWord.toHanzi())
                );
            },
            (error) => console.error(`Failed to get data due to ${error} `)
        );
    }

    private initCedict() {

        this.repoService.getCedictDico()
            .then(
                (data: Cedict) => {
                    const tmp: CedictWord[] = [];
                    const jsonConvert: JsonConvert = new JsonConvert();
                    for (const cedictWord of data.cedictWord) {
                        tmp.push(jsonConvert.deserializeObject(cedictWord, CedictWord));
                    }
                    this.hanzi = tmp.flatMap((cedictWord, index) =>
                        cedictWord.toHanzi()
                    );
                },
                (error) => console.error(`Failed to get data due to ${error} `)
            );
    }

    private formatHanzis(hanzis: Hanzi[]): string {
        if (hanzis.length === 0) {
            return new Hanzi('NA', 'NA', 'NA', []).toString();
        }
        const hanzi: Hanzi = hanzis[0];

        // if it contains multiple hanzi it must be due to same simplified hanzi
        if (hanzis.length > 1) {
            return hanzis.reduce((accumulator: Hanzi, currentValue: Hanzi) => {

                if (!accumulator.pinyin.includes(currentValue.pinyin)) {
                    accumulator.pinyin += `/${currentValue.pinyin}`;
                }

                if (!accumulator.translation.toString().includes(currentValue.translation.toString())) {
                    accumulator.translation = accumulator.translation
                        .concat('\n')
                        .concat(currentValue.translation);
                }

                return accumulator;
            }, hanzi).toString();
        }

        return hanzi.toString();
    }
}

