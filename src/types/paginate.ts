import { IBook } from "./ibooks";

export interface PaginateResponse {
  books: Array<IBook>;
  pagination: {
    totalRecords: number;
    limit: number;
    offset: number;
    nextPage: number;
  };
}
