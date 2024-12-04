import Typography from '@mui/material/Typography';
import Image from 'next/image'

import MainCard from 'components/MainCard';
import React from 'react';

import { IBook } from 'types/ibooks';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import BookRatings from 'components/BookRatings';


interface Props {
  book: IBook;
}

export default function BookPage({ book }: Props) {

  return (
    <MainCard>
      <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
        <Stack direction="column" spacing={2}>
          <Image src={book.icons.large} width={98} height={147} alt="Book cover" />
        </Stack>
        <Stack direction="column" spacing={2}>
          <Typography variant="h2">{book.title}</Typography>
          <Typography variant="body1">{book.authors}</Typography>
          <Typography variant="body1">{'first published ' + book.publication}</Typography>
          <BookRatings ratings={book.ratings} />
        </Stack>
      </Stack>
    </MainCard>
  );
}
