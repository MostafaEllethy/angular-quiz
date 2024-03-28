import { IUser } from './user.interface';

export interface IGetUsersResponse {
  data: IUser[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
