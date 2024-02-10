import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ng_web_component';
  firestore = inject(Firestore);
  chat: any[] = [];
  
  ngOnInit() {
    this.getDocData("Chat").subscribe((updates) => {
      console.log(updates);
      this.chat = updates.reverse();
    })
  }

  // Proper Angular way is to move this part into service
  // But for the presentation I keep it here
  getDocData(path: string) {
    return  collectionData(collection(this.firestore, path), { idField:  'id' }) as  Observable<any>;
  }
}
