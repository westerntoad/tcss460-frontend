import Typography from '@mui/material/Typography';
import Image from 'next/image';

import MainCard from 'components/MainCard';
import React from 'react';

import { IBook } from 'types/ibooks';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import BookRatings from 'components/BookRatings';
import WorkBy from 'components/WorkBy';
import { Button } from '@mui/material';

interface Props {
  book: IBook;
}

export default function BookPage({ book }: Props) {
  return (
    <MainCard>
      {(book.isbn13 && (
        <>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem sx={{ marginBottom: 10 }} />}>
            <Stack direction="column" spacing={2}>
              <Image src={book.icons.large} width={98} height={147} alt="Book cover" />
              <Button href={`change/${book.isbn13}`} sx={{ fontSize: 13 }} variant="contained">
                Alter Book
              </Button>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Typography variant="h2">{book.title}</Typography>
              <Typography variant="body1">{'by ' + book.authors}</Typography>
              <Typography variant="body1">{'first published ' + book.publication}</Typography>
              <BookRatings ratings={book.ratings} />
            </Stack>
          </Stack>

          <Typography variant="h3" sx={{ paddingTop: 3 }}>
            More by These Authors
          </Typography>
          <Divider sx={{ paddingTop: 0.5 }} />
          {book.authors.split(',').map((author: string) => (
            <WorkBy key={author} author={author} />
          ))}
        </>
      )) ||
        'Loading...'}
    </MainCard>
  );
}
