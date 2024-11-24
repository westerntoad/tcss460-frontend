'use client';

import * as React from 'react';
import { IBook } from 'types/ibooks';
import { PaginateResponse } from 'types/paginate';
import BookList from 'sections/books/BookList';

// project import
import axios from 'utils/axios';

export default function SearchPage() {
  const [theData, setTheData] = React.useState<IBook[]>([]);
  const [offset, setOffset] = React.useState(0);

 // const defaultTheme = createTheme();

  React.useEffect(() => {
    axios
      .get(`/books/all/?limit=50&offset=${offset}`)
      .then((response) => {
        const theData: PaginateResponse = response.data;
        setTheData(theData.books);
        setOffset(theData.pagination.nextPage);
      })
      .catch((error) => console.error(error));
  }, []);

  return <BookList bookData={theData} />;
}
