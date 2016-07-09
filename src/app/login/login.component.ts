import {Component} from '@angular/core'
import {Observable} from 'rxjs/Observable'

import {LoginService} from './login.service'

@Component({
  templateUrl:'./login.component.html',
  styleUrls:[
    './login.style.css'
  ],
  providers:[
    LoginService
  ]
})
export class Login {
  constructor(
    private loginService:LoginService
  ) {}

  login(e) {
    // e.preventDefault()
    this.loginService.login()
    .subscribe(
      data => {console.log(data)},
      err => {console.error(err)}
    )
    return false;
  }

  setDate(inputDate) {
    var D = new Date(inputDate)
    let date = D.getDate()
    let month = D.getMonth() + 1
    let year = D.getFullYear()
    let parsed:string = ''
    if(date < 10) {
      parsed+= '0'
    }
    parsed+= date.toString()
    if(month < 10) {
      parsed+= '0'
    }
    parsed+= month.toString()
    parsed+= year.toString()
    this.loginService.dob = parsed
  }
}
