import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cedict} from '../../../shared/models/dto/cedict/cedict';
import {JsonConvert} from 'json2typescript';
import {Hanzi} from '../../../shared/models/classes/hanzi';
import {HanzisTooltip} from '../components/story/story.component';

@Injectable()
export class StoriesService {

    constructor(private httpClient: HttpClient) {
    }

    public getStories(hsk: number): Promise<any> {
        return this.httpClient.get(`./assets/stories/hsk${hsk}/stories.json`).toPromise();
    }

    public getStory(storyTitle: string, hsk: number): Promise<any> {
        return this.httpClient.get(`./assets/stories/hsk${hsk}/${storyTitle}.json`).toPromise();
    }

    public getCedictDico(): Promise<any> {
        return this.httpClient.get(`./assets/cedict/cedict.json`).toPromise();
    }

    public initCedict(): Promise<Hanzi[]> {
        return this.getCedictDico()
            .then(
                (data: Cedict) => {
                    let cedict: Cedict = null;
                    const jsonConvert: JsonConvert = new JsonConvert();
                    try {
                        cedict = jsonConvert.deserializeObject(data, Cedict);
                        return cedict.cedictWord.flatMap((cedictWord) =>
                            cedictWord.toHanzi()
                        );
                    } catch (error) {
                        console.error(`Failed to deserialize cedict due to ${error}`);
                        throw error;
                    }
                },
                (error) => {
                    // TODO use interceptor to catch all http error
                    console.error(`Failed to dl cedict dictionary due to ${error} `);
                    throw error;
                }
            );
    }

    private getCandidate(words: string[], wordPosition: number, wordSize: number, wordsCandidate: Hanzi[]): HanzisTooltip {
        const wordFound: HanzisTooltip = {
            indexes: [],
            hanzis: []
        };

        const maxIndex = wordPosition + wordSize > words.length ?
            words.length : wordPosition + wordSize;

        const hanzis: Hanzi[] = this.getWord(words, wordPosition, maxIndex, wordsCandidate);

        if (hanzis.length > 0) {
            wordFound.hanzis = hanzis;
            wordFound.indexes =
                Array.from({length: maxIndex - wordPosition}, (v, k) => k + wordPosition);

            return wordFound;
        }

        return null;
    }

    public formatHanzis(hanzis: Hanzi[]): string {
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

    public getHanzisTooltip(hanzisDico: Hanzi[], textWords: string[], wordIndex: number, wordMaxSize: number): HanzisTooltip {
        // get words that contains the word
        const wordsCandidate: Hanzi[] = hanzisDico
            .filter((wordEl: Hanzi) => wordEl.simplified.includes(textWords[wordIndex]));

        const hanzisTooltipResult: HanzisTooltip = {
            indexes: [],
            hanzis: []
        };

        if (wordsCandidate.length !== 0) {
            let candidate: HanzisTooltip = null;
            for (let wordSize: number = wordMaxSize; wordSize !== 0; wordSize--) {
                candidate = this.getCandidate(textWords, wordIndex, wordSize, wordsCandidate);

                if (candidate != null) {
                    return candidate;
                }
            }

        }

        return hanzisTooltipResult;
    }

    private getWord(words: string[], idx0: number, idx1: number, wordsCandidate: Hanzi[]): Hanzi[] {
        const subWords: string = words.slice(idx0, idx1).join('');

        return wordsCandidate.filter((value) => value.simplified === subWords);
    }


}
