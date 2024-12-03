import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Rating from '@mui/material/Rating';

import MainCard from 'components/MainCard';
import React from 'react';

import { IBook } from 'types/ibooks';

// import { IBook } from 'types/ibooks';

interface Props {
  book: IBook;
}

export default function BookPage({ book }: Props) {

  return (
    <MainCard title={book.title}>
      <Typography variant="body2">{book.publication}</Typography>
      <Rating name="half-rating" readOnly value={book.ratings.average} precision={0.2} />
      <Image src={book.icons.large} width={98} height={147} alt="Book cover" />
    </MainCard>
  );
}
