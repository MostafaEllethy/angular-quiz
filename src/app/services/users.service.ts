import { User } from '@/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  page = 1;

  get() {
    return this.http.get<unknown>(`https://reqres.in/api/users?page=${1}`);
  }

  find(id: string) {
    return this.http.get<{ data: User }>(`https://reqres.in/api/users/${id}`);
  }
}
