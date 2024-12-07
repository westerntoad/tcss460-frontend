import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import React from 'react';

import axios from 'utils/axios';
import { BadIBook } from 'types/ibooks';
import BookIcon from './BookIcon';

interface Props {
  author: string;
}

export default function WorkBy({ author }: Props) {
  const [theData, setTheData] = React.useState<BadIBook[]>([]);

  React.useEffect(() => {
    console.log(author);
    axios
      .get(`/books/author/${author}`)
      .then((response) => {
        console.log(response.data);
        setTheData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h4" key={author} sx={{ paddingTop: 3 }}>
        {author}
      </Typography>
      <Divider sx={{ paddingTop: 0.5, width: 0.35 }} />
      <Stack direction="row" spacing={2}>
        {theData.map((currentBook: BadIBook) => (
          <BookIcon key={currentBook.isbn13} book={currentBook} />
          // <Typography key={currentBook.isbn13} variant="body2">
          //   {currentBook.title}
          // </Typography>
        ))}
      </Stack>
    </Stack>
  );
}
