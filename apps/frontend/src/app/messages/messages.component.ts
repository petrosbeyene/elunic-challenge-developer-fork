import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextarea } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { MessagesService, Message } from './messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextarea,
    CardModule
  ],
  template: `
    <div class="container mx-auto p-4">
      <p-card header="Create Message" styleClass="mb-4">
        <div class="mb-4">
          <textarea
            pInputTextarea
            [(ngModel)]="newMessage"
            [rows]="3"
            placeholder="Type your message here..."
            [autoResize]="true"
            class="w-full"
          ></textarea>
        </div>
        <p-button
          label="Send Message"
          (onClick)="createMessage()"
          [disabled]="!newMessage.trim()"
          severity="primary"
        ></p-button>
      </p-card>

      <p-card header="Messages" styleClass="mb-4">
        <p-table
          [value]="messages"
          [paginator]="true"
          [rows]="3"
          [totalRecords]="totalRecords"
          [lazy]="true"
          (onPage)="onPageChange($event)"
          [showCurrentPageReport]="true"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} messages"
          [rowsPerPageOptions]="[3]"
          styleClass="p-datatable-sm"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Message</th>
              <th style="width: 200px">Created At</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-message>
            <tr>
              <td>{{message.content}}</td>
              <td>{{message.createdAt | date:'medium'}}</td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="2" class="text-center p-4">No messages found.</td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    :host ::ng-deep {
      .p-inputtextarea {
        width: 100%;
        min-width: 100%;
      }
      .p-card {
        margin-bottom: 1rem;
      }
      .p-card-content {
        padding: 1rem;
      }
    }
  `]
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  totalRecords = 0;
  newMessage = '';

  constructor(private messagesService: MessagesService) {}

  ngOnInit() {
    this.loadMessages(1);
  }

  loadMessages(page: number) {
    this.messagesService.getMessages(page).subscribe(response => {
      this.messages = response.messages;
      this.totalRecords = response.total;
    });
  }

  onPageChange(event: any) {
    const page = event.first / event.rows + 1;
    this.loadMessages(page);
  }

  createMessage() {
    if (this.newMessage.trim()) {
      this.messagesService.createMessage(this.newMessage).subscribe(() => {
        this.newMessage = '';
        this.loadMessages(1);
      });
    }
  }
}