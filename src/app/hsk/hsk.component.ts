import {Component, OnInit} from '@angular/core';
import {RepoService} from '../../services/repo.service';
import {JsonConvert} from 'json2typescript';
import {ApiHsk} from '../../models/api/hsk/hsk';
import {ApiWord} from '../../models/api/hsk/word';

export interface WordFound {
    word: ApiWord;
    indexes: number[];
}

@Component({
    selector: 'app-hsk',
    templateUrl: './hsk.component.html',
    styleUrls: ['./hsk.component.scss']
})
export class HskComponent implements OnInit {

    private text: string;
    public words: string[];
    public hanzi: ApiWord[];
    public indexToHighlight: number[] = [];

    public tooltipText: string;

    constructor(private repoService: RepoService) {
    }

    ngOnInit() {
        this.text = `森林里住着好多小动物，有聪明的狐狸、可爱的小兔子、善良的大象、慈祥的老猴子……还有一只爱美的小刺猬。小刺猬觉得呀，自己是这个森林里最漂亮的。
    有一次，小刺猬正在河边洗脸，听到不远处大家的欢笑声。走近一看，发现平时不起眼的山羊姐姐烫了头发，变得非常美丽，大家正在夸奖她呢。小刺猬不高兴了，心里想：我也要去烫头发，让自己变得更美丽。
    第二天，小刺猬就来到了森林美发店，跟美发师孔雀阿姨说：“阿姨，我想烫一个山羊姐姐那样的头发，一个圆圈一个圆圈的，好像方便面一样，可漂亮了。”
    孔雀阿姨说：“你想好了吗？真的想烫头发？”
  “是啊，美丽的孔雀阿姨，您就给我烫吧。”小刺猬着急地说。
    于是，孔雀就一下一下地卷起了小刺猬的刺。小刺猬可紧张了，一直也不敢看镜子里的自己。等烫完了，小刺猬看着镜子里的自己，每一根刺都卷卷的，真的漂亮极了。
    小刺猬高兴地离开了美发店，回家的路上，她想象着大家夸她漂亮的样子，心里别提多开心了。可是，走到一半的时候，大灰狼从草丛里跳了出来，他流着口水说：“小刺猬，平时你的刺尖尖的，我不敢咬你，但是今天你的刺都变圆了，我就能舒舒服服地吃你了！哈哈哈哈”小刺猬吓得赶紧缩成一团——没有了尖尖的刺，大灰狼不再怕他了。
    小刺猬吓得哭了起来。还好，大象叔叔和猴子爷爷听到哭声赶跑了大灰狼，救了小刺猬。
    猴子爷爷抱着吓坏了的小刺猬，慢慢地说：“傻孩子，你的头发和山羊的头发不一样，你的刺能够保护你不被伤害，还能用来搬运自己喜欢的果子。如果把自己变成别人的样子，就过不了自己的生活，再漂亮也不是自己了。”
    小刺猬明白了，她马上回到美发店，把自己的刺变回原来的样子。从镜子里看着变回来的自己，她又可以保护自己了，她又是那个最漂亮的小刺猬了。`;

        this.words = this.text.match(/./g);

        let hskLevel = 1;
        const hskPromise: Promise<any>[] = [];
        for (hskLevel = 1; hskLevel < 6; hskLevel++) {
            hskPromise.push(this.repoService.getHSKJSON(hskLevel.toString()));
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
                this.hanzi = tmp.flatMap((value, index) => value.words);
            },
            (error) => console.error(`Failed to get data due to ${error} `)
        );


    }

    public updateTooltip(wordIndex: number) {
        this.tooltipText = this.getUniqueElement(wordIndex, 4);
    }


    private getUniqueElement(wordIndex: number , wordMaxSize: number): string {
        // get words that contains the word
        const wordsCandidate: ApiWord[] = this.hanzi
            .filter((wordEl: ApiWord) => wordEl.hanzi.includes(this.words[wordIndex]));

        if (wordsCandidate.length === 0) {
            this.indexToHighlight = [];
            return 'NA';
        }

        let word: WordFound = null;
        for (let wordSize: number = wordMaxSize; wordSize !== 0; wordSize--) {
            word = this.getApiWord(wordIndex, wordSize, wordsCandidate);

            if (word != null) {
                console.log(word);

                this.indexToHighlight = word.indexes;
                return word.word.toString();
            }
        }

        this.indexToHighlight = [];
        return 'NA';
    }

    private getApiWord(wordPosition: number, wordSize: number, wordsCandidate: ApiWord[]): WordFound {
        const wordFound: WordFound = {
            indexes: [],
            word: null
        };

        const maxIndex = wordPosition + wordSize > this.words.length ?
            this.words.length : wordPosition + wordSize;

        let result: ApiWord = this.getWord(wordPosition, maxIndex, wordsCandidate);

        if (result != null) {
            wordFound.word = result;
            wordFound.indexes =
                Array.from({length: maxIndex - wordPosition}, (v, k) => k + wordPosition);

            return wordFound;
        }

        const minusIndex = wordSize - wordPosition > 0 || this.words.length < wordSize ?
            0 : wordPosition - wordSize;

        result = this.getWord(minusIndex, wordPosition + 1, wordsCandidate);

        if (result != null) {
            wordFound.word = result;
            wordFound.indexes =
                Array.from({length: wordPosition  + 1 - minusIndex}, (v, k) => k + minusIndex);

            return wordFound;
        }

        return null;
    }

    private getWord(idx0: number, idx1: number, wordsCandidate: ApiWord[]): ApiWord {
        const subWords: string = this.words.slice(idx0, idx1).join('');

        return wordsCandidate.find((value) => value.hanzi === subWords);
    }

}
