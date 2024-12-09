import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Link from '@mui/material/Link';

// Project Imports
import { IBook } from 'types/ibooks';

interface Props {
  book: IBook;
  width: number;
  height: number;
}

export default function BookIcon({ book, width, height }: Props) {
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  
  const fallbackImage = 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png';

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
          src={hasError ? fallbackImage : book.icons.large}
          // width={98}
          // height={147}
          width={width}
          height={height}
          alt="Book cover"
          onError={() => setHasError(true)}
          style={imgStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
    </Tooltip>
  );
}
