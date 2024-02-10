import { AsyncPipe, CommonModule, NgClass, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FieldValue, Firestore, addDoc, collection, collectionData, serverTimestamp, orderBy, query, FirestoreModule } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

interface Message {
  user: string,
  message: string,
  createdAt: FieldValue
}

@Component({
  selector: 'chat-app',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // firestore = inject(Firestore);
  chat$!: Observable<Message[]>;
  
  @ViewChild("messageContainer") messageContainer!: ElementRef;
  chatForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private firestore: Firestore) {}

  ngOnInit() {
    // Proper Angular way is to move this part into service
    // But for the presentation I keep it here
    const chatCollection = collection(this.firestore, "Chat");
    const queryRef = query(chatCollection, orderBy("createdAt"));
    this.chat$ = collectionData(queryRef) as Observable<Message[]>;

    this.chatForm = this.formBuilder.group({
      user: new FormControl('default user'),
      message: new FormControl(null)
    });
  }

  ngAfterViewChecked() {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  sendMessage() {
    const user = this.chatForm.get("user");
    const message = this.chatForm.get("message");
    console.log(user?.value);
    console.log(message?.value);
    this.addDocData("Chat",{
        user: user?.value,
        message: message?.value,
        createdAt: serverTimestamp()
    });
    message?.setValue("");
  }

  // Proper Angular way is to move this part into service
  // But for the presentation I keep it here
  addDocData(path: string, value: Message) {
    addDoc(collection(this.firestore, path), value);
  }
}
