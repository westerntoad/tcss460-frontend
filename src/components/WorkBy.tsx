import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import React from 'react';

import axios from 'utils/axios';
import { BadIBook } from 'types/ibooks';
import BookIcon from './BookIcon';
import { Paper } from '@mui/material';

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
      <Paper style={{maxHeight: 200, overflow: 'auto'}}>
        <Stack direction="row" sx={{ padding: 3 }} spacing={2}>
          {theData.map((currentBook: BadIBook) => (
            <BookIcon key={currentBook.isbn13} book={currentBook} />
            // <Typography key={currentBook.isbn13} variant="body2">
            //   {currentBook.title}
            // </Typography>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
