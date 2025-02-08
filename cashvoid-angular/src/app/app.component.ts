import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <h1 class="title">CASHVOID</h1>
      <nav class="nav">
        <a routerLink="/home" routerLinkActive="active">Home</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
        <a routerLink="/chat" routerLinkActive="active">Chat</a>
        <!-- <a routerLink="/images" routerLinkActive="active">Images</a> -->
      </nav>
    </header>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--bg-dark);
    }

    .header {
      background-color: var(--bg-dark);
      color: var(--primary-color);
      padding: 1rem;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.5);
      border-bottom: 1px solid var(--border-color);
    }

    .container {
      background-color: var(--bg-dark);
    }

    .title {
      margin: 0;
      font-size: 3em;
      font-family: 'UnifrakturMaguntia', serif;
      color: var(--primary-color);
      text-shadow: 2px 2px 4px #000;
      animation: glow 2s ease-in-out infinite alternate;
    }

    .nav {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      gap: 2rem;

      a {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        padding: 0.5rem 1rem;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(230, 57, 70, 0.2),
            transparent
          );
          transition: 0.5s;
        }

        &:hover::before {
          left: 100%;
        }

        &.active {
          color: var(--text-color);
          text-shadow: 0 0 10px var(--primary-color);
        }
      }
    }
  `]
})
export class AppComponent {
  title = 'CASHVOID';
}
