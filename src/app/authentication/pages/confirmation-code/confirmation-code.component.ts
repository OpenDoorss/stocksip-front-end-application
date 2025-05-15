import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './confirmation-code.component.html',
  styleUrls: ['./confirmation-code.component.css']
})
export class ConfirmationCodeComponent {
  code: string[] = ['', '', '', '', '', ''];
  codeArray = new Array(6);

  autoFocusNext(event: any, index: number) {
    const input = event.target;
    let value = input.value.toUpperCase();

    // Reemplaza cualquier carácter que no sea letra o número
    if (!/^[A-Z0-9]$/.test(value)) {
      input.value = '';
      this.code[index] = '';
      return;
    }

    this.code[index] = value;
    input.value = value;

    if (index < 5) {
      input.nextElementSibling?.focus();
    }
  }

}
