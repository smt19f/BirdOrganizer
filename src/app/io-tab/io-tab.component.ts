import { Component, OnInit } from '@angular/core';
import { SortingService } from '../sorting.service';

@Component({
  selector: 'app-io-tab',
  templateUrl: './io-tab.component.html',
  styleUrls: ['./io-tab.component.css'],
  providers: [SortingService]
})
export class IoTabComponent implements OnInit {

  constructor(private sortingService: SortingService) { }

  inputText: string = "";
  outputText: string = "";

  ngOnInit(): void {
  }

  importSamples(): void {
    this.sortingService.Import(this.inputText);
  }

  clearInput(): void {
    this.inputText = "";
  }

  sortSamples(): void {
    this.sortingService.Sort();
    this.outputText = this.sortingService.Export();
    console.log(this.outputText);
  }
}
