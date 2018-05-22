import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public _httpClient: HttpClient
  ) { }

  callGetService(url) {
    return this._httpClient.get(url);
  }
}
