import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';
import React from 'react';

import axios from 'utils/axios';

// import { IBook } from 'types/ibooks';

interface Props {
  isbn: string;
}

export default function BookPage({ isbn }: Props) {
  // const [book, setBook] = React.useState<IBook>({});
  const [title, setTitle] = React.useState<string>('');

  console.log(isbn);
  React.useEffect(() => {
    axios
      .get(`/books/isbn/${isbn}`)
      .then((response) => {
        response.status == 200 && setTitle(response.data.book.title);
      })
      .catch((error) => {
        console.error(error);
        setTitle(`Book with isbn=${isbn} not found.`);
  });
  }, []);

  return (
    <MainCard title="Book">
      <Typography variant="body2">{title}</Typography>
    </MainCard>
  );
}
