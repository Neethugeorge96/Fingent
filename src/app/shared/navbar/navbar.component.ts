import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  subcription: Subscription;
  header: any;
  userData: any;
  constructor(private EmployeeService: EmployeeService,
    public _auth: AuthService) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('userData')
    this.getHeaderData()
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();

  }


  getHeaderData() {
    this.subcription = this.EmployeeService.getHeadingData().subscribe({
      next: (res: any) => {
        this.header = res
      }
    })
  }

  logOut() {
    this._auth.logOut()
  }
}
