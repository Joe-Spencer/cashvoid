import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="images-container">
      <h2>CASHVOID Images</h2>
      <div class="image-gallery">
        <!-- Add your images here -->
      </div>
    </div>
  `,
  styles: [`
    .images-container {
      text-align: center;
      padding: 20px;
    }
    
    .image-gallery {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      margin: 20px 0;
    }
  `]
})
export class ImagesComponent {} 