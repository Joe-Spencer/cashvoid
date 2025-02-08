import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header-container">
      <h1>{{ title }}</h1>
    </div>
  `,
  styles: [`
    .header-container {
      width: 100%;
      text-align: center;
    }
    
    h1 {
      font-family: 'Crimson Text', serif;
      color: var(--text-color);
      font-size: 2em;
      margin: 0.25rem 0;
      letter-spacing: 0.2em;
      font-weight: 300;
      text-transform: uppercase;
      display: inline-block;
    }
  `]
})
export class HeaderComponent {
  @Input() title: string = '';
} 