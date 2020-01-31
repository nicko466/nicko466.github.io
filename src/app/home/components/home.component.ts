import {Component, HostListener, OnInit} from '@angular/core';

export enum EnumImage {
    landscape = 'landpage-kazuend-unsplash-cut.jpg',
    portrait =  'landpage-kazuend-unsplash-portrait.jpg'
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public homeImage = EnumImage.landscape;

    ngOnInit() {
        this.updateHomeImage();
    }

    @HostListener('window:resize', ['$event'])
    public onResize() {
        this.updateHomeImage();
    }

    private updateHomeImage() {
        const newHomeImage: EnumImage = this.getHomeImage();
        if (this.homeImage !== newHomeImage) {
            this.homeImage = newHomeImage;
        }
    }

    private getHomeImage(): EnumImage {
        if (window.innerWidth / window.innerHeight < 1) {
            return EnumImage.portrait;
        }

        return EnumImage.landscape;
    }

}
