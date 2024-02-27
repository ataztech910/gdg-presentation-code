import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Firestore, collection, orderBy, collectionData, FieldValue, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Message {
  user: string,
  message: string,
  createdAt: FieldValue
}

@Component({
  selector: 'message-counter',
  standalone: true,
  imports: [NgClass, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  chatData$!: Observable<Message[]>;
  counter = 0;
  
  constructor(private firestore: Firestore, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    // Proper Angular way is to move this part into service
    // But for the presentation I keep it here
    const chatCollection = collection(this.firestore, "Chat");
    const queryRef = query(chatCollection, orderBy("createdAt"));
    this.chatData$ = collectionData(queryRef) as Observable<Message[]>;
    this.chatData$.subscribe((data) => {
      console.log(data.length);
      this.counter = data.length;
      this.cd.detectChanges();
    })
  }
}
