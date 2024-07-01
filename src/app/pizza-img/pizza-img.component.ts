import { Component, Input } from '@angular/core';
import { AppSettings } from '../app.config';

@Component({
  selector: 'app-pizza-img',
  standalone: true,
  imports: [],
  templateUrl: './pizza-img.component.html',
  styleUrl: './pizza-img.component.scss'
})
export class PizzaImgComponent {
  @Input({required: true}) public id!: number
  public API_PATH: string;

  constructor(
    
  ){
    this.API_PATH = AppSettings.API_path;
  }

} 
