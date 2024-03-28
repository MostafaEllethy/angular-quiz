import { UsersService } from '@/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  //* Constructor
  constructor(private readonly usersService: UsersService) {}

  //* Hooks
  ngOnInit(): void {
    this.usersService.get().subscribe({ next: (res) => console.log(res) });
  }
}
