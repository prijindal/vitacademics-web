import {Injectable} from '@angular/core'
import { Observable } from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http'


@Injectable()
export class VitHttp {
  constructor(
    private http:Http
  ) { }

  HOST:string = 'https://vitacademics-rel.herokuapp.com'

  private errorHandler(err) {
    // return Observable.of(err);
    return Observable.throw(err)
  }

  post = (url:string, data:Object) => {
    return this.http.post(url, data)
    .map((res) => {
      var data = res.json()
      if(data.status) {
        if(data.status.code == 0) {
          return data
        }
        else if(data.status.code) {
          throw new Error(data.status.message)
        }
        else {
          throw new Error('Unknown Server Error')
        }
      }
      else {
        throw new Error('Unknown Server Error')
      }
    })
    .catch(this.errorHandler)
  }
  get = this.http.get
  patch = this.http.patch
  delete = this.http.delete
  put = this.http.put
}
