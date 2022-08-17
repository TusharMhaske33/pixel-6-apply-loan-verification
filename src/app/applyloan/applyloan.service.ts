import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseState } from 'src/app/core/common.response.model';

@Injectable({
  providedIn: 'root'
})
export class ApplyloanService {

  constructor(private http: HttpClient) { }

  /**
     * this method will responsible to store the data into cookies
    */
  public post(url, body): Observable<ResponseState | Object> {
    return this.http.post(url, body);
  }



 
}
