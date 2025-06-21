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
import { CareGuideService } from '../../../services/care-guide.service';
import {ToolBarComponent} from '../../../../public/components/tool-bar/tool-bar.component';
import {SideNavbarComponent} from '../../../../public/components/side-navbar/side-navbar.component';

@Component({
  selector: 'app-care-guide-create',
  imports: [
    CommonModule,
    TranslatePipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ToolBarComponent,
    SideNavbarComponent
  ],
  templateUrl: './care-guide-create.component.html',
  styleUrls: ['./care-guide-create.component.css']
})

export class CareGuideCreateComponent {
  name = '';
  type = '';
  description = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private router: Router, private careGuideService: CareGuideService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
  }

  clearSelection(event: MouseEvent): void {
    event.stopPropagation();
    this.previewUrl = null;
  }

  onEnter(url: string): void {
    const productData = {
      name: this.name,
      type: this.type,
      description: this.description,
      imageUrl: this.previewUrl?.toString() || ''
    };

    this.careGuideService.create(productData).subscribe(
      (response) => {
        console.log('Product saved successfully:', response);
        this.router.navigate([url]);
      },
      (error) => {
        console.error('Error saving product:', error);
      }
    );
  }

  onCancel(url: string): void {
    this.router.navigate([url]);
  }
}
