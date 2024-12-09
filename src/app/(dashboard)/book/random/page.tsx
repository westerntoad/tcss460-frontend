'use client';
import * as React from 'react';
import axios from 'utils/axios';
import Loader from 'components/Loader';
import { useRouter } from 'next/navigation'

export default function Loading() {
  const numBooks = 9_125;
  const router = useRouter();

  React.useEffect(() => {
    axios
      .get(`/books/all/?limit=1&offset=${Math.floor(Math.random() * numBooks)}`)
      .then((response) => {
        (response.data.books.length && router.push(`/book/${response.data.books[0].isbn13}`)) || console.log('Error finding book.');
      })
      .catch((error) => console.error(error));
  }, []);

  return <Loader />;
}
