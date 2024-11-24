'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { ImageList } from '@mui/material';
import ListedBook from 'components/ListedBook';
import { IBook } from 'types/ibooks';

export default function BookList({ bookData }: { bookData: Array<IBook> }) {
  console.log(bookData);
  return (
    <ImageList sx={{ width: 1000, height: 1000 }} cols={4} rowHeight={150}>
      {bookData.map((currentBook: IBook) => (
        <ListedBook book={currentBook} key={currentBook.isbn13} />
      ))}
    </ImageList>
  );
}
