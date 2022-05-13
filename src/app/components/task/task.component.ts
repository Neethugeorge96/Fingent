import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskList: Array<any> = [];
  allTaskList: Array<any> = [];
  selectedValue: number = 0;
  taskValue: any;
  displayedColumns: string[] = ['slNo', 'description', 'status'];
  employeeId: number;
  displayStyle = "none";
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((res: any) => {

      this.employeeId = res.get('id')


    })
    this.getTaskList();
  }


  getTaskList() {
    this.employeeService.getTaskDetails(this.employeeId).subscribe({
      next: (res) => {
        this.taskList = this.allTaskList = res;
        this.taskList.map(x => {
          if (x.completed == false) {
            x.completed = 'Not Completed'
          }
          else {
            x.completed = 'Completed'
          }
        })
        let headingData = { head: 'Employee Task', count: this.taskList.length }
        this.employeeService.setHeadingData(headingData)
      },
      error: (msg: any) => {
        console.log('Error:', msg);
      }
    })
  }


  filterData() {
    if (this.selectedValue == 1) {
      this.taskList = this.allTaskList.filter(x => x.completed == 'Completed')
    }
    else if (this.selectedValue == 2) {
      this.taskList = this.allTaskList.filter(x => x.completed == 'Not Completed')
    }
    else {
      this.taskList = this.allTaskList;
    }
  }

  addTask() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  save() {
    let taskData = {
      id: 0,
      completed: 'Not Completed',
      title: this.taskValue,
      userId: this.employeeId
    }

    this.taskList =this.allTaskList = [taskData, ...this.allTaskList]
    let headingData = { head: 'Employee Task', count: this.taskList.length }
    this.employeeService.setHeadingData(headingData);
    this.taskValue="";
    this.closePopup();
  }
}
