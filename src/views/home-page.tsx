'use client';
import axios from 'utils/axios';
import { IBook } from 'types/ibooks';
import { convertBadIBook } from 'utils/toIBook';
import { Stack } from '@mui/system';
import BookIcon from 'components/BookIcon';

// project imports
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

const ratings = [4.82, 4.77, 4.75, 4.73, 4.71, 4.68];

export default function HomePage() {
  const [topRated, setTopRated] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const requests = ratings.map((rating) =>
          axios.get(`/books/rating/${rating.toString()}`).then((response) => response.data.map(convertBadIBook))
        );
        const results = await Promise.all(requests);
        const allBooks = results.flat();
        setTopRated(allBooks);
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <MainCard title="Top Rated">
      <Stack direction="row" sx={{ padding: 2 }} spacing={2}>
        {topRated.map((currentBook: IBook) => (
          <BookIcon width={98} height={147} key={currentBook.isbn13} book={currentBook} />
        ))}
      </Stack>
    </MainCard>
  );
}
