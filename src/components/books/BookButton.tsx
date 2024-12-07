'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import Link from 'next/link';
/* import Badge from '@mui/material/Badge';
import StarFilled from '@ant-design/icons/StarFilled'; */

import { IBook } from 'types/ibooks';

export default function BookButton({ book }: { book: IBook }) {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const imgStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '5px',
    fontSize: '16px',
    boxShadow: hover ? '0 0 2px 1px rgba(0, 140, 186, 0.5)' : 'unset',
    width: '100px',
    height: '150px'
  };
  console.log("I'm being rendered!");

  let component = (
    <Link href={'/book/' + book.isbn13}>
      <img
        src={book.icons.large}
        alt={book.title}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={imgStyle}
        title={book.title}
      />
    </Link>
  );

/*   if (book.ratings.average >= 4) {
    return (
      <Badge badgeContent={<StarFilled style={{ fontSize: 14 }} />} style={{ position: 'absolute' }}>
        {component}
      </Badge>
    );
  } */

  return component;
}
