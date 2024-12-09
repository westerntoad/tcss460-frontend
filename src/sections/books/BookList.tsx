'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { IBook } from 'types/ibooks';
import { Container } from '@mui/system';
import BookIcon from 'components/BookIcon';
import Grid2 from '@mui/material/Unstable_Grid2';

export default function BookList(props: { bookData: Array<IBook> }) {
  
  return (
    <div>
      <Container component="main" maxWidth="md">
        <Grid2 columns={15} justifyContent="center" container spacing={2}>
          {props.bookData.map((currentBook: IBook) => (
            <Grid2 md={3} key={currentBook.isbn13} display="flex" justifyContent="center" alignItems="center">
              <BookIcon book={currentBook} key={currentBook.isbn13} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </div>
  );
}
