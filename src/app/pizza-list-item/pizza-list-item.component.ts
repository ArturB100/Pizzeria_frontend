import { Component, Host, HostBinding, Input } from '@angular/core';
import { Pizza } from '../types/menu';

@Component({
  selector: 'app-pizza-list-item',
  standalone: true,
  imports: [],
  templateUrl: './pizza-list-item.component.html',
  styleUrl: './pizza-list-item.component.scss'
})
export class PizzaListItemComponent {
  @HostBinding('style.padding') padding: string = '0px';
  @Input({required: true}) public pizza!: Pizza
  constructor(){}


}
