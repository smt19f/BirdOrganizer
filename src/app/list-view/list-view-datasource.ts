import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { SortingService } from '../sorting.service';
import { Injectable } from '@angular/core';

// TODO: Replace this with your own data model type
export interface Sample {
  num: number;
  date: string;
  species: string;
  primer: string;
  realtime: string;
  sex: string;
  comments: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_SAMPLES: Sample[] = [
  {num: 1, date: "4/15", species: "Greencheek Conure", primer: "F-21-395z/405w", realtime: "Mw/Mz", sex: "", comments: "BC"},
  {num: 2, date: "4/15", species: "Greencheek Conure", primer: "F-21-395z/405w", realtime: "Mw/Mz", sex: "", comments: "BC"},
  {num: 3, date: "4/15", species: "Greencheek Conure", primer: "F-21-395z/405w", realtime: "Mw/Mz", sex: "", comments: "BC"},
]

/**
 * Data source for the ListView view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListViewDataSource extends DataSource<Sample> {
  data: Sample[];
  sortingService: SortingService;
  // paginator: MatPaginator | undefined;
  // sort: MatSort | undefined;

  constructor(sort: SortingService) {
    super();
    this.sortingService = sort;
    this.data = sort.mainArray;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Sample[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return merge(observableOf(this.data))
      .pipe(map(() => {
        return [...this.data ];
    }));
  }
  

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}
}
