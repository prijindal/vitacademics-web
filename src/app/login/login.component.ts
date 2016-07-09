import {Component} from '@angular/core'

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
    console.log(e)
    // e.preventDefault()
    // this.loginService.login()
    // .subscribe(() => {})
    return false;
  }
}
