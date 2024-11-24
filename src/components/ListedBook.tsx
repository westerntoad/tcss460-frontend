'use client';
/* eslint-disable @next/next/no-img-element */

import { ImageListItem, ImageListItemBar } from '@mui/material';

import { IBook } from 'types/ibooks';

export default function ListedBook({ book }: { book: IBook }) {
  console.log(book.icons.small);
  return (
    <ImageListItem key={book.isbn13}>
      <img
        srcSet={`${book.icons.large}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${book.icons.large}?w=164&h=164&fit=crop&auto=format`}
        alt={book.title}
        loading="lazy"
      />
      <ImageListItemBar position="below" title={book.title} />
    </ImageListItem>
  );
}
