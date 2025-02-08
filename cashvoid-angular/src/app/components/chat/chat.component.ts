import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FooterComponent } from '../shared/footer.component';
import { HeaderComponent } from '../shared/header.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent],
  template: `
    <app-header title="CHAT WITH THE VOID"></app-header>
    <div id="chat-history"></div>
    <form class="input-bar" (ngSubmit)="sendMessage()">
      <input [(ngModel)]="userInput" 
             id="user-input"
             name="userInput"
             placeholder="Type your message..." 
             required>
      <button type="submit">Send</button>
    </form>
    <p class="learning-message">please be kind, chatvoid is still learning ^.^</p>
    <app-footer></app-footer>
  `,
  styles: [`
    #chat-history {
      border: 2px solid var(--border-color);
      padding: 10px;
      height: 400px;
      overflow-y: scroll;
      background-color: rgba(0, 0, 0, 0.7);
      margin: 20px 0;
      position: relative;

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        background: var(--bg-dark);
      }

      &::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 5px;
      }

      p {
        animation: fadeIn 0.3s ease-out;
      }
    }

    .input-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0;
    }

    #user-input {
      padding: 10px;
      font-size: 1em;
      border: 2px solid var(--border-color);
      border-radius: 5px;
      flex: 1;
      margin-right: 10px;
      background-color: var(--bg-dark);
      color: var(--text-color);
    }

    button {
      position: relative;
      overflow: hidden;
      
      &::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          45deg,
          transparent,
          rgba(255,255,255,0.1),
          transparent
        );
        transform: rotate(45deg);
        transition: 0.5s;
      }

      &:hover::after {
        left: 100%;
      }
    }

    #chat-history p {
      font-size: 1.2rem;
      line-height: 1.6;
      margin: 0.5rem 0;
      text-align: left;
    }
    
    #chat-history strong {
      font-size: 1.2rem;
      color: var(--primary-color);
      display: block;
      margin-bottom: 5px;
    }

    .learning-message {
      text-align: center;
      color: var(--text-color);
      font-style: italic;
      margin: 1rem 0;
    }
  `]
})
export class ChatComponent {
  @ViewChild('chatHistory') private chatHistory!: ElementRef;
  userInput = '';

  constructor(private apiService: ApiService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Get the chat history element
    const chatHistory = document.getElementById('chat-history');
    if (!chatHistory) return;

    // Add user message
    chatHistory.innerHTML += `<p><strong>CHATVOIDUSER:</strong></p><p>${this.userInput}</p>`;
    
    // Create element for AI response
    const aiResponseElement = document.createElement('p');
    chatHistory.appendChild(document.createElement('strong')).textContent = 'CHATVOID:';
    chatHistory.appendChild(aiResponseElement);

    // Clear input
    const message = this.userInput;
    this.userInput = '';

    // Send to API
    this.apiService.sendMessage(message).subscribe({
      next: (response) => {
        aiResponseElement.innerHTML = response;
        chatHistory.scrollTop = chatHistory.scrollHeight;
      },
      error: (error) => {
        console.error('Error:', error);
        aiResponseElement.innerHTML = 'Sorry, an error occurred.';
      }
    });

    // Scroll to bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }
} 