import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

const apiKey = 'nQgyfDRtAibDZAV67VSq';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-My-Custom-Header': `${apiKey}`,
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class ChartService {
  private baseUrl = 'https://data.nasdaq.com/api/v3/datasets/';
  
  
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http : HttpClient) { }

  nasdaqData(endpoint: string) {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http
      .get(url, httpOptions)
      .toPromise()
      .then((data) => {
        return data;
      });
  }
}
