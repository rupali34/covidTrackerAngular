import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-errormessage',
  templateUrl: './errormessage.component.html',
  styleUrls: ['./errormessage.component.css']
})
export class ErrormessageComponent implements OnInit {
  showMoreContent = false;
  morecontent = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data.error && this.data.error.httpType) {

    } else {
      this.morecontent = this.data.error.stack
    }
  }

  moreContent() {
    this.showMoreContent = true;
  }

  lessContent() {
    this.showMoreContent = false;
  }
}
