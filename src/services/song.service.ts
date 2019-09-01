import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class SongService {

  constructor(private httpClient: HttpClient) {}

  public getJSON(): Observable<any> {
    return this.httpClient.get("./assets/songs/songs5.json");
  }


}
