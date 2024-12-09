'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { IBook } from 'types/ibooks';
import { Container } from '@mui/system';
import BookIcon from 'components/BookIcon';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Link, Rating, Stack, Typography } from '@mui/material';

function BookInfo(props: { book: IBook }) {
  const maxBookLength = 40;
  const title = props.book.title.length > maxBookLength ? props.book.title.substring(0,maxBookLength) + '...' : props.book.title;

  return (
    <Stack direction='column' spacing={0.5} sx={{justifyContent: 'center'}}>
      <Link sx={{color: 'black'}} href={'/book/' + props.book.isbn13}>
        <Typography sx={{height: `${14 * 5}px`}}><strong>{title}</strong></Typography>
      </Link>
      <Typography><em>{props.book.publication}</em></Typography>
      <Rating name="book-rating" readOnly value={props.book.ratings.average} precision={0.2} />
    </Stack>
  );
}

export default function BookList(props: { bookData: Array<IBook> }) {
  return (
    <div>
      <Container component="main" maxWidth="md">
        <Grid2 columns={6} justifyContent="center" container spacing={2}>
          {props.bookData.map((currentBook: IBook) => (
            <Grid2 md={2} width={500} key={currentBook.isbn13}>
              <Stack direction='row' spacing={2}>
                <BookIcon width={143} height={221} book={currentBook} key={currentBook.isbn13} />
                <BookInfo book={currentBook} />
              </Stack>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </div>
  );
}
