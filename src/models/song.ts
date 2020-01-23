import {Lyric} from './lyric';
import {ApiSong} from './api/song/apiSong';

export class Song {

    public title: string = null;

    public url: string = null;

    public cover: string = null;

    public lyrics: Lyric[][] = [];

    public langs: Set<ApiLang> = new Set();

    constructor(apiSong: ApiSong) {
        this.url = apiSong.url;
        this.title = apiSong.title;
        this.cover = apiSong.cover;
        this.lyrics = this.getLyrics(apiSong);
    }

    public getLyrics(apiSong: ApiSong): Lyric[][] {
        const lyrics: string[][] = apiSong.lyrics
            .map((value) => value.sentences);

        const result: Lyric[][] = [];
        let numberOflang = 0;
        let numberOfSentences = 0;
        if (Array.isArray(lyrics) && lyrics.length > 0) {
            numberOflang = lyrics.length;

            if (Array.isArray(lyrics[0]) && lyrics[0].length > 0) {
                numberOfSentences = lyrics[0].length;
            }
        }

        for (let indexSentence = 0; indexSentence < numberOfSentences; indexSentence++) {

            result[indexSentence] = [];

            for (let indexLang = 0; indexLang < numberOflang; indexLang++) {

                const apiLang: ApiLang = apiSong.lyrics[indexLang].getLang();

                this.langs.add(apiLang);

                result[indexSentence].push(
                    new Lyric(
                        apiLang,
                        apiSong.lyrics[indexLang].sentences[indexSentence],
                        apiSong.lyrics[indexLang].phonetic[indexSentence]
                    )
                );

            }

        }

        return result;
    }


}
