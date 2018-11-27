import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Menu de cancelaciones');
  }

  public setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle ); 
  }
}
