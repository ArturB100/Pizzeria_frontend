import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from '../app.config';

@Component({
  selector: 'app-pizza-img',
  standalone: true,
  imports: [],
  templateUrl: './pizza-img.component.html',
  styleUrl: './pizza-img.component.scss'
})
export class PizzaImgComponent implements OnInit{
  @Input({required: true}) public id!: number
  public API_PATH: string;
  imageUrl: string = '';

  
  constructor(
    
  ){
    this.API_PATH = AppSettings.API_path;
  }


  ngOnInit(): void {
    this.setImageUrl();
  }

  setImageUrl(): void {
    const primaryImageUrl = `${this.API_PATH}/images/${this.id}.jpg`;
    const fallbackImageUrl = '/pizza.jpg';

    this.checkImageExists(primaryImageUrl).then((exists) => {
      this.imageUrl = exists ? primaryImageUrl : fallbackImageUrl;
    });
  }

  checkImageExists(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

} 
