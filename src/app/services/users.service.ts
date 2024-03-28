import { IGetUsersResponse, IUser } from '@/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  get(page = 1) {
    return this.http.get<IGetUsersResponse>(
      `https://reqres.in/api/users?page=${page}`
    );
  }

  find(id: string) {
    return this.http.get<{ data: IUser }>(`https://reqres.in/api/users/${id}`);
  }
}
