import { Component, OnInit, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Sample } from '../sample';
import { SortingService } from '../sorting.service';

@Component({
  selector: 'app-list-tab',
  templateUrl: './list-tab.component.html',
  styleUrls: ['./list-tab.component.css'],
  providers: [SortingService]
})
export class ListTabComponent implements OnInit {

  displayedColumns: string[] = ["num", "date", "species", "primer", "realtime", "sex", "comments"];
  dataSource: Observable<Sample[]>;

  constructor(public sortingService: SortingService) {
    this.dataSource = this.sortingService.myObservable;
  }


  ngOnInit(): void {
  }

}
