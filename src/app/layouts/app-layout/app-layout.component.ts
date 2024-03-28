import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersSearchComponent } from '@/components';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule, UsersSearchComponent, RouterModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {}
