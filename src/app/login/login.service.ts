import {Injectable} from '@angular/core'

import { VitHttp } from '../services/vithttp'

@Injectable()
export class LoginService {
  constructor(
    private http:VitHttp
  ) {}

  regno:string = ''
  number:number
  date:Date = new Date()
  login() {
    return this.http.post('',{})
  }
}
