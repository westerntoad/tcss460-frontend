'use client';
import { useParams } from 'next/navigation';
import BookPage from 'views/book';

import React from 'react';

import axios from 'utils/axios';

import { IBook } from 'types/ibooks';

export default function Page() {
  const [book, setBook] = React.useState<IBook>({
    isbn13: 0,
    authors: '',
    publication: 0,
    original_title: '',
    title: '',
    ratings: {
      average: 0,
      count: 0,
      rating_1: 0,
      rating_2: 0,
      rating_3: 0,
      rating_4: 0,
      rating_5: 0,
    },
    icons: {
      large: '',
      small: ''
    }
  });
  const params = useParams();

  React.useEffect(() => {
    axios
      .get(`/books/isbn/${params.isbn}`)
      .then((response) => {
        console.log(response);
        response.status == 200 && setBook(response.data.books);
      })
      .catch((error) => {
        console.error(error);
  });
  }, []);

  return <BookPage book={book} />;
}