import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Message {
  id: number;
  content: string;
  createdAt: string;
}

export interface MessagesResponse {
  messages: Message[];
  total: number;
  currentPage: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiUrl = 'api/messages';

  constructor(private http: HttpClient) {}

  getMessages(page: number): Observable<MessagesResponse> {
    // Ensure page is a valid number and convert to string for query parameter
    const pageParam = Math.max(1, Math.floor(page)).toString();
    return this.http.get<MessagesResponse>(`${this.apiUrl}?page=${pageParam}`);
  }

  createMessage(content: string): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, { content });
  }
} 