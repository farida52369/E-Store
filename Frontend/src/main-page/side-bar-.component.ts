import { Component } from '@angular/core';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar-component.html',
  styleUrls: ['./side-bar-component.css']
})

export class AppComponent{
  title = '';
  filter: string = '';
  getFilter(val: string) {
    this.filter = val;
  }
}