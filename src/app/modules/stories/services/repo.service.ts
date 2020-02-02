import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class RepoService {

    constructor(private httpClient: HttpClient) {}

    public getCedictDico(): Promise<any> {
        return this.httpClient.get(`./assets/cedict/cedict.json`).toPromise();
    }

}
