import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/model/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  _card: Card
  @Input() set card(value){
    this._card = value;
  }
  get card(){
    return this._card;
  }
  @Output() onUpdateCard = new EventEmitter();
  @Output() onDeleteCard = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
}
