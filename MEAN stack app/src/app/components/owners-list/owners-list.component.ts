import { Owner } from './../../shared/owner';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})

export class OwnersListComponent implements OnInit {

  OwnerData: any = [];
  dataSource: MatTableDataSource<Owner>;
  displayedColumns: string[] = ['_id', 'owner_name', 'license_plate', 'action'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort; //Directive to access sorting option.

  constructor(private ownerApi: ApiService) {
    this.ownerApi.GetOwners().subscribe(data => {
      this.OwnerData = data;
      this.dataSource = new MatTableDataSource<Owner>(this.OwnerData);
      this.dataSource.sort = this.sort; //Update sorting option.
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  ngOnInit() {
  }

  deleteOwner(index: number, e) {

    if (window.confirm('Are you sure you want to REMOVE?')) {
      const data = this.dataSource.data;
      const itemIndex = data.findIndex(obj => obj._id === e._id);  //Get index of deletable record from dataSource.
      this.dataSource.data.splice(itemIndex, 1);    //Remove record using index.
      this.dataSource.paginator = this.paginator;  //Update paginator.
      this.ownerApi.DeleteOwner(e._id).subscribe();
    }
  }

  //Filter search result from dataSource.
  searchFromResultSet = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}










