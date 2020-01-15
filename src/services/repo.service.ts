import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class RepoService {

  constructor(private httpClient: HttpClient) {}

  public getJSON(element: string): Observable<any> {
    return this.httpClient.get(`./assets/songs/${element}.json`);
  }

  public getHSKJSON(element: string): Observable<any> {
    return this.httpClient.get(`./assets/hsk/hsk-level-${element}.json`);
  }

}
