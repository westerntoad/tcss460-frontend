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
  const [hasError, setHasError] = React.useState<boolean>(false);

  const fallbackImage = 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png';
  const isbnString = '' + book.isbn13;
  const formatedISBN = `${isbnString.substring(0, 3)}-${isbnString.charAt(3)}-${isbnString.substring(4, 6)}-${isbnString.substring(6, 12)}-${isbnString.charAt(12)}`;

  return (
    <MainCard>
      {(book.isbn13 && (
        <>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem sx={{ marginBottom: 10 }} />}>
            <Stack direction="column" spacing={2} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
              <Image
                src={hasError ? fallbackImage : book.icons.large}
                width={98}
                height={147}
                alt="Book cover"
                onError={() => setHasError(true)}
              />
              <Typography variant="body1" sx={{ fontSize: 9, fontFamily: 'monospace' }}>{formatedISBN}</Typography>
              <Button href={`change/${book.isbn13}`} sx={{ fontSize: 13 }} variant="contained">
                Alter Book
              </Button>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography variant="h2">{book.title}</Typography>
              <Typography variant="body1">
                <em>{'by ' + book.authors}</em>
              </Typography>
              <Typography variant="body1">{'First published ' + book.publication}</Typography>
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
