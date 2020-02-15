import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { environment } from '../../../environments/environment';

declare var gtag: Function;

@Injectable({
    providedIn: 'root'
})
export class GoogleAnalyticsService {

    constructor(private router: Router) {}

    public event(eventName: string, params: {}) {
        gtag('event', eventName, params);
    }

    public init(){
        this.initTagManager();
        this.initAnalytics();
    }

    public initAnalytics() {
        try {
            const script = document.createElement('script');
            script.async = true;
            script.innerHTML = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', '${environment.googleAnalyticsKey}', 'auto'); `;
            document.head.appendChild(script);
        } catch (ex) {
            console.error("Error appending google analytics");
            console.error(ex);
        }
    }

    public initTagManager() {
        this.listenForRouteChanges();

        try {

            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.googleAnalyticsKey;
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '` + environment.googleAnalyticsKey + `', {'send_page_view': false});
            `;
            document.head.appendChild(script2);
        } catch (ex) {
            console.error("Error appending google tag manager");
            console.error(ex);
        }
    }

    private listenForRouteChanges() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', environment.googleAnalyticsKey, {
                    'page_path': event.urlAfterRedirects,
                });
            }
        });
    }
}
