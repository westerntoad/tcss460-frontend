import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Link from '@mui/material/Link';

// Project Imports
import { IBook } from 'types/ibooks';

interface Props {
  book: IBook;
}

export default function BookIcon({ book }: Props) {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const imgStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: hover ? '1px' : '5px',
    fontSize: '16px',
    boxShadow: hover ? '0 0 2px 1px rgba(0, 140, 186, 0.5)' : 'unset'
  };

  return (
    <Tooltip title={<Typography variant="body2">{book.title}</Typography>}>
      <Link href={'/book/' + book.isbn13}>
        <Image
          src={book.icons.large}
          width={98}
          height={147}
          alt="Book cover"
          style={imgStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
    </Tooltip>
  );
}
