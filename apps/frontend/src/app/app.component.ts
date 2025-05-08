import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';

@Component({
  standalone: true,
  imports: [RouterModule, MessagesComponent],
  selector: 'app-root',
  template: `
    <app-messages></app-messages>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f5f5f5;
    }
  `],
})
export class AppComponent {}
