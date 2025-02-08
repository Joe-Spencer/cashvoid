import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../shared/footer.component';
import { HeaderComponent } from '../shared/header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, HeaderComponent],
  template: `
    <section class="page-container">
      <app-header title="ABOUT THE VOID"></app-header>
      <div class="content">
       <p> </p>
        <p>Joseph Spencer is a real weirdo. In 2018 he created CASHVOID.com. He isn't entirely sure why he made CASHVOID.com or why he is typing this right now.</p>
        <p>CASHVOID.com has gone through many iterations over the years but pretty much all of them have been bad. This might be the worst version yet.</p>
        <p><a routerLink="/chat">Speak with CHATVOID to learn more</a></p>
      </div>
      <app-footer></app-footer>
    </section>
  `,
  styles: [`
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    p {
      margin-bottom: 1.5rem;
    }

    a {
      color: var(--primary-color);
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        text-shadow: 0 0 10px var(--primary-color);
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--primary-color);
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  `]
})
export class AboutComponent {} 