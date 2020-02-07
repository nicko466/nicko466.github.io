import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class RepoService {

    constructor(private httpClient: HttpClient) {
    }

    public getSong(element: string): Observable<any> {
        return this.httpClient.get(`./assets/songs/${element}.json`);
    }

    public getHSK(level: string): Promise<any> {
        return this.httpClient.get(`./assets/hsk/hsk-level-${level}.json`).toPromise();
    }
}
