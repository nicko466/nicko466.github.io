import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiHsk} from '../models/dto/hsk/hsk';
import {JsonConvert} from 'json2typescript';
import {Hanzi} from '../models/classes/hanzi';
import {HanzisTooltip} from '../../modules/stories/components/story/story.component';

@Injectable()
export class HskService {

    constructor(
        private httpClient: HttpClient) {
    }

    private getAllHsks(): Promise<Hanzi[]> {
        let hskLevel = 1;
        const hskPromise: Promise<any>[] = [];
        for (hskLevel = 1; hskLevel < 6; hskLevel++) {
            hskPromise.push(this.getHSK(hskLevel.toString()));
        }

        return Promise.all(
            hskPromise
        ).then(
            (data: any[]) => {
                const tmp: ApiHsk[] = [];
                const jsonConvert: JsonConvert = new JsonConvert();
                for (const hskElement of data) {
                    tmp.push(jsonConvert.deserializeObject(hskElement, ApiHsk));
                }
                return tmp.flatMap((value, index) =>
                    value.words.map((apiWord, index1) => apiWord.toHanzi())
                );
            },
            (error) => {
                console.error(`Failed to get data due to ${error} `);
                return [];
            }
        );
    }

    public getHSK(level: string): Promise<any> {
        return this.httpClient.get(`./assets/hsk/hsk-level-${level}.json`).toPromise();
    }

}
