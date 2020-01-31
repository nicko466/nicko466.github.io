import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

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
            url : 'hsk',
            text : 'Hsk stories',
        },
        {
            url : 'songs/songs5',
            text : 'Lyrics 5',
        },
    ];

}
