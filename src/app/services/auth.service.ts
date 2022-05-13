import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router:Router,
  ) { }

  setToken(data:any){
    let userData = JSON.stringify(data)
    localStorage.setItem('userData',userData)
  }

  isLoggedIn(){
    return localStorage.getItem('userData')
  }

  logOut(){
    localStorage.removeItem('userData')
    this.router.navigate(['login'])
  }


}
