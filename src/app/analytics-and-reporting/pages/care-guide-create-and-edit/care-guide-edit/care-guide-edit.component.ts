import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LanguageSwitcherComponent } from '../../../../public/components/language-switcher/language-switcher.component';
import {ToolBarComponent} from '../../../../public/components/tool-bar/tool-bar.component';
import {SideNavbarComponent} from '../../../../public/components/side-navbar/side-navbar.component';

@Component({
  selector: 'app-care-guide-edit',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe,
    ToolBarComponent,
    SideNavbarComponent
  ],
  templateUrl: './care-guide-edit.component.html',
  styleUrl: './care-guide-edit.component.css'
})

export class CareGuideEditComponent {
  name = '';
  type = '';
  description = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
  }

  clearSelection(event: MouseEvent): void {
    event.stopPropagation();
    this.previewUrl = null;
  }

  onEnter(url: string): void {
    console.log('Saving guide:', { name: this.name, type: this.type, description: this.description });
    this.router.navigate([url]);
  }

  onCancel(url: string): void {
    this.router.navigate([url]);
  }

  onDelete(url: string): void {
    console.log('Deleting guide');
    this.router.navigate([url]);
  }
}
