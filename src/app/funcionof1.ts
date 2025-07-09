// src/app/funcionof1.ts
import { Observable, of } from 'rxjs';

export interface Producto {
  nombre: string;
  precio: number;
}

// Simulamos una respuesta observable con dos productos
export const obtenerProductos$: Observable<Producto[]> = of([
  { nombre: 'Producto A', precio: 100 },
  { nombre: 'Producto B', precio: 250 }
]);
