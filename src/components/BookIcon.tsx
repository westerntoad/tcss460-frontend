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
  const [hasError, setHasError] = React.useState<boolean>(false);
  const fallbackImage = 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png';

  return (
    <Tooltip title={<Typography variant="body2">{book.title}</Typography>}>
      <Link href={book.isbn13}>
        <Image onError={() => setHasError(true)} src={hasError ? fallbackImage : book.image_url} width={98} height={147} alt="Book cover" />
      </Link>
    </Tooltip>
  );
}
