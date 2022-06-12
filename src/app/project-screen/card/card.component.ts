import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/model/card';
import { User } from 'src/model/user';

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

  tarihfark(createdDate, updatedDate) {
    var tarih1 = new Date(createdDate);
    var tarih2 = new Date(updatedDate);
    //iki tarih arasındaki saat farkını hesaplamak için aşağıdaki yöntemi kullanabiliriz.
    var zamanFark = Math.abs(tarih2.getTime() - tarih1.getTime());
    
    //zamanFark değişkeni ile elde edilen saati güne çevirmek için aşağıdaki yöntem kullanılabilir.
    var gunFark = Math.ceil(zamanFark / (1000 * 3600 * 24)); 
    var date1:any = new Date();
    var date2:any = new Date(updatedDate);
    var kalangun:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    if(gunFark > 0)
      return gunFark;
    else
      return "Bir günden daha yeni";
  }

  getFirstLetter(user){
    return user?.name?.charAt(0) + user?.surname?.charAt(0);
  }
}
