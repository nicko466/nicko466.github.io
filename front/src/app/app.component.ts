import {Component} from '@angular/core';

export interface INavButton {
    url: string;
    text: string;
    icon: string;
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
            url: '/',
            text: 'Home',
            icon: 'house',
        },
        {
            url: 'stories',
            text: 'Hsk stories',
            icon: 'book',
        },
        {
            url: 'songs/songs5',
            text: 'Lyrics 5',
            icon: 'speaker',
        },
    ];

}
