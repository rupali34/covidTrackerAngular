import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
@Input() cardType = 'In';
@Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

  getHeading() {
    switch(this.cardType) {
      case 'In':
       return 'Infected';
      case 'Re':
        return 'Recovered';
       case 'De':
        return 'Deaths';
       default: 
       return '';   
    }
  }

}
