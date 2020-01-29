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
export class AppComponent implements OnDestroy {

    public mobileQuery: MediaQueryList;
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
    private readonly mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }

}
