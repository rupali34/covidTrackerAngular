import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  /** Input variable for card type */
  @Input() cardType = 'In';
  /** Input variable to hold card data */
  @Input() data: any;

  constructor() { }

  /**
   * 
   * @returns heading of the cards
   */
  getHeading() {
    switch (this.cardType) {
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
