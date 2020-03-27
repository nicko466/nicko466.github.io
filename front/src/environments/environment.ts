// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    googleAnalyticsKey: 'UA-71272114-1',
    production: false,
    kraken: {
        wsauth: 'wss://ws-auth.kraken.com',
        ws: 'wss://ws.kraken.com',
        wsSand: 'ws://ws-sandbox.kraken.com',
        token: 'Srt0SVxeRiWLRxAQu2oxPoyhsbVF+zoglik6/+pzklfCYNLox2HAEr4Y',
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
