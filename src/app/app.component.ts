import {Component} from '@angular/core';

export interface INavButton {
    url: string;
    text: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public title = 'My playground';
    public fillerNav: INavButton [] = [
        {
            url : '/',
            text : 'Home',
        },
        {
            url : 'stories',
            text : 'Hsk stories',
        },
        {
            url : 'songs/songs5',
            text : 'Lyrics 5',
        },
    ];

}
