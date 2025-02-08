import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../shared/footer.component';
import { HeaderComponent } from '../shared/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  template: `
    <section class="page-container description">
      <app-header title="WELCOME TO THE VOID"></app-header>
      <canvas #canvas width="500" height="500"></canvas>
      <app-footer></app-footer>
    </section>
  `,
  styles: [`
    .page-container {
      text-align: center;  // Ensure everything inside is centered
      display: flex;
      flex-direction: column;
      align-items: center;  // Center flex items horizontally
    }

    canvas {
      margin: 0.25rem auto;
      display: block;
      width: 400px;
      height: 300px;
    }

    app-footer {
      margin-top: 0.25rem;
    }
  `]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number = 0;
  private angle = 0;
  private points = [
    [-1, -1, -1, -1], [-1, -1, -1, 1], [-1, -1, 1, -1], [-1, -1, 1, 1],
    [-1, 1, -1, -1], [-1, 1, -1, 1], [-1, 1, 1, -1], [-1, 1, 1, 1],
    [1, -1, -1, -1], [1, -1, -1, 1], [1, -1, 1, -1], [1, -1, 1, 1],
    [1, 1, -1, -1], [1, 1, -1, 1], [1, 1, 1, -1], [1, 1, 1, 1],
  ];

  private edges: number[][] = [];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCanvas();
    }, 0);
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    
    if (!context) {
      console.error('Could not get canvas context');
      return;
    }
    
    this.ctx = context;
    
    // Initialize edges
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (this.points[i][k] !== this.points[j][k]) diff++;
        }
        if (diff === 1) {
          this.edges.push([i, j]);
        }
      }
    }

    // Start animation
    this.animate();
  }

  private project(point4D: number[]): number[] {
    const w = 2;
    const scale4D = 1 / (w - point4D[3]);
    
    const x3D = point4D[0] * scale4D;
    const y3D = point4D[1] * scale4D;
    const z3D = point4D[2] * scale4D;
    
    const viewer_distance = 5;
    const scale3D = 1 / (viewer_distance - z3D);
    
    const x2D = x3D * scale3D * this.canvasRef.nativeElement.width / 2;
    const y2D = y3D * scale3D * this.canvasRef.nativeElement.height / 2;
    
    return [x2D, y2D];
  }

  private rotate4D(point: number[]): number[] {
    const sinA = Math.sin(this.angle);
    const cosA = Math.cos(this.angle);
    
    let x = point[0] * cosA - point[1] * sinA;
    let y = point[0] * sinA + point[1] * cosA;
    let z = point[2];
    let w = point[3];
    
    let x2 = x * cosA - z * sinA;
    let z2 = x * sinA + z * cosA;
    
    let x3 = x2 * cosA - w * sinA;
    let w2 = x2 * sinA + w * cosA;
    
    let y2 = y * cosA - z2 * sinA;
    let z3 = y * sinA + z2 * cosA;
    
    let y3 = y2 * cosA - w2 * sinA;
    let w3 = y2 * sinA + w2 * cosA;
    
    let z4 = z3 * cosA - w3 * sinA;
    let w4 = z3 * sinA + w3 * cosA;
    
    return [x3, y3, z4, w4];
  }

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set line style
    this.ctx.strokeStyle = '#e63946'; // Using the primary color
    this.ctx.lineWidth = 2;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = '#e63946';
    
    const transformed_points = this.points.map(point => {
      const rotated = this.rotate4D(point);
      return this.project(rotated);
    });
    
    this.edges.forEach(edge => {
      const p1 = transformed_points[edge[0]];
      const p2 = transformed_points[edge[1]];
      
      this.ctx.beginPath();
      this.ctx.moveTo(p1[0] + canvas.width / 2, p1[1] + canvas.height / 2);
      this.ctx.lineTo(p2[0] + canvas.width / 2, p2[1] + canvas.height / 2);
      this.ctx.stroke();
    });
    
    this.angle += 0.01;
  }

  private animate = () => {
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
} 