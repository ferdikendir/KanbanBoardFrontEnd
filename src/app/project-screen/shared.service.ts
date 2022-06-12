import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { MoveCard } from 'src/model/move-card';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

 

  constructor() { }
  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    const el = event.container.element.nativeElement.childNodes[0]
    const target: MoveCard = {
      targetTaskListHeader: el.childNodes[0].textContent || '',
      card: event.container.data[event.currentIndex],
    };
    return target
  }
}
