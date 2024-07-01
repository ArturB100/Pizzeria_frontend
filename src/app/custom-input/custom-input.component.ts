import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss'
})
export class CustomInputComponent {
  @Input( {required: true} ) value!: string
  @Input( {required: true} ) errorMsg!: string
  @Input( {required: true} ) name!: string
  @Input( {required: true} ) placeholder!: string
  @Input() type: string | undefined;

  @Output() valueChange = new EventEmitter<string>();

  onValueChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.valueChange.emit( inputElement.value);
  }

}
