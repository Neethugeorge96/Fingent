import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employeeList: Array<any> = [];
  displayedColumns: string[] = ['slNo', 'empName', 'empPhn', 'empEmail'];
  dataSource: any;
  searchKey: any;
  allEmployeeList: Array<any> = []

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployeeList();


  }

  getEmployeeList() {

    this.employeeService.getEmployeeList().subscribe({


      next: (res) => {
        this.employeeList = this.allEmployeeList = res;
        this.dataSource = new MatTableDataSource(this.employeeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        let headingData = { head: 'Employees', count: this.employeeList.length }
        this.employeeService.setHeadingData(headingData)

      },
      error: (msg: any) => {
        console.log('Error:', msg);
      }
    })
  }

  empClick(event: any) {
    let employeeId = event.id;
    this.router.navigate(['task', employeeId]);


  }
  searchEmployee() {
    if (this.searchKey == '') {
      this.employeeList = this.allEmployeeList
      this.dataSource = this.employeeList;
    }
    else {
      this.employeeList = this.allEmployeeList.filter(x => x.name.trim().toLowerCase().includes(this.searchKey.trim().toLowerCase()))
      this.dataSource = this.employeeList;
    }



  }


  sortChange(sort: any) {
    const data = this.employeeList.slice();
    if (!sort.active || sort.direction === '') {
      this.employeeList = data;
      this.dataSource = new MatTableDataSource(data);

      return;
    }

    this.employeeList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'phone': return this.compare(a.phone, b.phone, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        default: return 0;
      }
    });

  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }



}
