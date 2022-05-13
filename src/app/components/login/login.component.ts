
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder,
    private _authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(loginData?: any): FormGroup {
    return this.formBuilder.group({
      userName: [loginData ? loginData.userName : "", [Validators.required],],
      password: [loginData ? loginData.password : "", [Validators.required,],],
    });
  }

  login() {


    if (this.loginForm.valid) {

      let loginData = this.loginForm.value


      if (loginData.userName.toLowerCase() === 'fingent' && loginData.password === 'fingent') {
        let userData = { userName: loginData.userName }
        this._authService.setToken(userData);
        this.snackBar.open("Login Succesfull", '', {
          panelClass: 'success-snack',
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 3000
        })

        this.router.navigate(['dashboard'])
      }

      else {
        this.snackBar.open("Invalid Username or Password", '', {
          panelClass: 'error-snack',
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 3000
        })



      }
    }



  }

}
