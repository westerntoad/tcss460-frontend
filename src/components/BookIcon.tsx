import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import React from 'react';

import { BadIBook } from 'types/ibooks';
import Link from '@mui/material/Link';

interface Props {
  book: BadIBook;
}

export default function BookIcon({ book }: Props) {
  return (
    <Tooltip title={<Typography variant="body2">{book.title}</Typography>}>
      <Link href={book.isbn13}>
        <Image src={book.image_url} width={98} height={147} alt="Book cover" />
      </Link>
    </Tooltip>
  );
}
