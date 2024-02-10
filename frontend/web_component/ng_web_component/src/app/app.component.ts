import { NgClass, NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ng_web_component';
  firestore = inject(Firestore);
  chat: any[] = [];
  
  @ViewChild("messageContainer") messageContainer!: ElementRef;
  chatForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getDocData("Chat").subscribe((updates) => {
      console.log(updates);
      this.chat = updates.reverse();
    });

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
    this.chat.push({
      user: user?.value,
      message: message?.value
    });
    message?.setValue("");
  }

  // Proper Angular way is to move this part into service
  // But for the presentation I keep it here
  getDocData(path: string) {
    return  collectionData(collection(this.firestore, path), { idField:  'id' }) as  Observable<any>;
  }
}
