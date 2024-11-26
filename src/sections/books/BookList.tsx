'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import BookButton from 'components/books/BookButton';
import { IBook } from 'types/ibooks';
import { Box, Container } from '@mui/system';

export default function BookList({ bookData }: { bookData: Array<IBook> }) {
  console.log(bookData);
  return (
    <div>
      <Container component="main" maxWidth="md">
        {bookData.map((currentBook: IBook) => (
          <BookButton book={currentBook} key={currentBook.isbn13} />
        ))}
      </Container>
    </div>
  );
}
