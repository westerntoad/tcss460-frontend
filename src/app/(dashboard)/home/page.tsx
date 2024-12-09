'use client';
import BookIcon from 'components/BookIcon';
import MainCard from 'components/MainCard';
import * as React from 'react';
import BookList from 'sections/books/BookList';
import { IBook } from 'types/ibooks';
import axios from 'utils/axios';
import BookPage from 'views/book';

// ==============================|| PAGE ||============================== //

export default function HomeViewPage() {
  const [theData, setTheData] = React.useState<IBook[]>([]);
  const numBooks = 9_125;
  const numDesired = 10;
  React.useEffect(() => {
    let newBooks: IBook[] = [];
    for (let i = 0; i < numDesired; i++) {
      axios
        .get(`/books/all/?limit=1&offset=${Math.floor(Math.random() * numBooks)}`)
        .then((response) => {
          newBooks.push(response.data.books[0]);
        })
        .catch((error) => console.error(error));
    }
    console.log(newBooks);
    setTheData(newBooks);
  }, []);

  return <MainCard>{(theData.length && <BookPage book={theData[0]} />) || 'Loading...'}</MainCard>;
}
