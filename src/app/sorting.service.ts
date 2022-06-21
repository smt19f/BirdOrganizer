import { Injectable } from '@angular/core';
import { Sample } from './sample';
import { of, Observable } from 'rxjs';
import * as _ from 'underscore';

function log(input: any) {
  console.log(input);
}

const EXAMPLE_SAMPLES: Sample[] = [
  {num: 1, date: "4/15", species: "Greencheek Conure", primer: "F-21-395z/405w", realtime: "Mw/Mz", sex: "", comments: "BC"},
  {num: 2, date: "4/15", species: "Greencheek Conure", primer: "F-21-395z/405w", realtime: "Qw/Mz", sex: "", comments: "BC"},
  {num: 3, date: "4/15", species: "Greencheek Conure", primer: "F-21-395z/405w", realtime: "Mw/Mz", sex: "", comments: "BC"},
]

const EXAMPLE_SAMPLES2: Sample[] = [
  {num: 1, date: "4/15", species: "nope Conure", primer: "F-21-395z/405w", realtime: "Mw/Mz", sex: "", comments: "BC"},
  {num: 2, date: "4/15", species: "nuhuh Conure", primer: "F-21-395z/405w", realtime: "Qw/Mz", sex: "", comments: "BC"},
  {num: 3, date: "4/15", species: "nadda Conure", primer: "F-21-395z/405w", realtime: "Mw/Mz", sex: "", comments: "BC"},
]

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  mainArray: Sample[] = [];
  myObservable: Observable<Sample[]>;
  mixes: string[] = [];

  constructor() {
    this.mainArray = EXAMPLE_SAMPLES;
    this.myObservable = of(this.mainArray);
  }

  Import(input: string) {

    //slice removes the last character of string, which is an unessecary newline from excel
    const sampleArray = input.slice(0,-1).split("\n");

    for (let str of sampleArray) {
      const dataArray = str.split("\t");
      let sample = new Sample();

      sample.num = parseInt(dataArray[0]);
      sample.date = dataArray[1];
      sample.species = dataArray[2];
      sample.primer = dataArray[3];
      sample.realtime = dataArray[4];
      sample.sex = dataArray[5];
      sample.comments = dataArray[6];

      this.mainArray.push(sample);
    }

    for (let sample of this.mainArray) {
      log(sample.num);
    }
  }

  Sort(): void {

    let map = new Map<string, Sample[]>();
    this.mixes = [];

    //fill hashmap with samples
    for (let sample of this.mainArray) {
      const key = sample.realtime;
      let arr: Sample[] = [];

      if (map.has(key)) {
        arr = map.get(key) as Sample[];
      }
      else {
        this.mixes.push(key);
      }

      arr.push(sample);
      map.set(key, arr)
    }

    //order them ascending by sample number
    let newArray: Sample[] = [];
    for (let mix of this.mixes) {
      if (map.has(mix)) {
        let arr = map.get(mix) as Sample[];
        arr.sort(function(a, b) {
          return a.num - b.num;
        });
        newArray = [...newArray, ...arr];
        
      }
    }

    while (this.mainArray.length > 0) {
      this.mainArray.pop();
    }
    for (let sample of newArray) {
      this.mainArray.push(sample);
    }

    //this.mainArray = newArray;

    log(this.myObservable);
    //this.myObservable = of(newArray);
    log(this.myObservable);

    for (let sample of this.mainArray) {
      log(sample.num);
    }

  }

  Export(): string {
    let str: string = "";
    for(let sample of this.mainArray) {
      str = str + sample.num.toString() +
        '\t' + sample.date +
          '\t' + sample.species +
            '\t' + sample.primer +
              '\t' + sample.realtime +
                '\t' + sample.sex +
                  '\t' + sample.comments + '\n';
                
    }
    return str;
  }

}

const REALTIME_MIXES: string[] = [
  "Mw/Mz", "Vw/Mz", "Qw/Mz",
  "Sw/Mz", "Pw/Mz", "Ow/Mz",
  "Mw/Qz", "Vw/Qz", "Vw/Bz",
  "Bw/Mz", "Bw/Bz", "Bw/Qz",
  "Ww/Mz", "Hw/Mz", "Plw/Mz",
  "BEw/Mz", "Ww/Bz", "Mw/Qz",
  "Mwlow/Mz",
]





