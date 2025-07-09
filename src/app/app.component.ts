import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 600px; margin: 60px auto; padding: 30px; background-color: #fff8f0; border: 4px solid #660000; border-radius: 8px;">
      <h1>Contador Retro RxJS</h1>
      <p style="font-size: 12px;">Actualización automática cada segundo:</p>
      <h2>{{ currentCount }}</h2>

      <button (click)="stopCounter()">DETENER</button>
      <button (click)="startCounter()">REINICIAR</button>

      <p style="font-size: 10px; margin-top: 30px;">
        Revisa la consola para ver los valores emitidos por el Observable.
      </p>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  currentCount: number = 0;
  private counterSubscription?: Subscription;

  ngOnInit() {
    console.log('AppComponent inicializado. Iniciando contador...');
    const myCounter$ = interval(1000);
    this.counterSubscription = myCounter$.subscribe({
      next: (num) => {
        this.currentCount = num;
        console.log('Observable emitió:', num);
      },
      error: (error) => console.error('Error en el Observable:', error),
      complete: () => console.log('Observable completado.')
    });
  }

  ngOnDestroy() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
      console.log('Contador detenido al destruir el componente.');
    }
  }

  stopCounter() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
      this.counterSubscription = undefined;
      console.log('Contador detenido manualmente.');
    }
  }

  startCounter() {
    if (!this.counterSubscription) {
      const myCounter$ = interval(1000);
      this.counterSubscription = myCounter$.subscribe({
        next: (num) => {
          this.currentCount = num;
          console.log('Observable emitió:', num);
        },
        error: (error) => console.error('Error en el Observable:', error),
        complete: () => console.log('Observable completado.')
      });
      console.log('Contador reiniciado.');
    }
  }
}
