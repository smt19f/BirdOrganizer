import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SortingService } from '../sorting.service';
import { ListViewDataSource, Sample } from './list-view-datasource';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Sample>;
  dataSource: ListViewDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["num", "date", "species", "primer", "realtime", "sex", "comments"];;

  constructor(private sortingService: SortingService) {
    this.dataSource = new ListViewDataSource(sortingService);
  }

  
  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
  }
}
