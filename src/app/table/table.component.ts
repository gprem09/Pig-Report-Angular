import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from '../api-service.service';
import { AddFormComponent } from '../add-form/add-form.component';
import { InfoPopupComponent } from '../info-popup/info-popup.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['location', 'name', 'time', 'status', 'action1', 'action2', 'action3'];
  dataSource!: MatTableDataSource<any>;
  pigs: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiServiceService) {}

  openDialog() {
    this.dialog.open(AddFormComponent, {
      width: '50%'
    }).afterClosed().subscribe(val=>{
      if (val ==='save'){
        this.getAll();
      }
    });
  }

  getAll() {
    this.api.get().subscribe({
      next: (data)=>{
        console.log(data);
        for(let i=0; i<data.length; i++){
          this.pigs.push(data[i].data)
        }
        this.dataSource = new MatTableDataSource(this.pigs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pigs = []
      },
      error: (err)=>{
        alert('error while fetching');
      }
    })
  }

  deletePig(id: string) {
    let password = prompt('Please enter the password:');

    if(password  === 'OINK!!') {
      this.api.delete(id).subscribe({
        next: (res)=>{
          this.getAll();
          window.location.reload();
        },
        error:()=>{
          alert('error while delete')
        }
      })
    }
    else {
      alert('Wrong Password!');
    }
  }


  moreInfo(row: any) {
    this.dialog.open(InfoPopupComponent,{
      width: '50%',
      data:row
    })
  }

  retrieve(row: any) {
    let password = prompt('Please enter the password:');
    if(password === 'OINK!!') {
      row.status = 'Retrieved';
      this.api.put(row.id, row).subscribe({
        next:(res)=>{
          window.location.reload();
        }
      })
    }
    else {
      alert('Wrong password');
    }
  }

  ngOnInit(): void {
    this.getAll();
  }
}