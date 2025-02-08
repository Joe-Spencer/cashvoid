import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer>
      <p>© 2025 CASHVOID</p>
    </footer>
  `,
  styles: [`
    footer {
      text-align: center;
      padding: 0.25rem;
      color: var(--text-color);
      font-family: 'Crimson Text', serif;
      margin-top: 2rem;
    }
  `]
})
export class FooterComponent {} 