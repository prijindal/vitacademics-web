import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import { VitHttp } from '../services/vithttp'

@Injectable()
export class LoginService {
  constructor(
    private http:VitHttp
  ) {}

  regno:string = ''
  mobile:number
  dob:string
  campus:string = 'vellore'
  login() {
    return this.http.post('https://vitacademics-rel.herokuapp.com/api/v2/' + this.campus +'/login',{
      regno:this.regno,
      mobile:this.mobile,
      dob:this.dob
    })
  }
}
