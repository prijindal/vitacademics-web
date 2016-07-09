import {Injectable} from '@angular/core'

import {Http, Headers, RequestOptions} from '@angular/http'

@Injectable()
export class VitHttp {
  constructor(
    private http:Http
  ) { }

  HOST:string = 'https://vitacademics-rel.herokuapp.com'

  get = this.http.get
  post = this.http.post
  patch = this.http.patch
  delete = this.http.delete
  put = this.http.put
}
