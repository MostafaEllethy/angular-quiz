import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchInputComponent } from '@/components';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule, SearchInputComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {}
