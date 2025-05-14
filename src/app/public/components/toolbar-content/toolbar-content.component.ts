import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-toolbar-content',
  imports: [
    MatToolbar,
    MatIcon
  ],
  templateUrl: './toolbar-content.component.html',
  styleUrl: './toolbar-content.component.css'
})
export class ToolbarContentComponent {

  @Input() pageTitle: string = '';
}
