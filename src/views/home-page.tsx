'use client'

// project imports
import MainCard from 'components/MainCard';
import { useEffect } from 'react';
import BookList from 'sections/books/BookList';
import axios from 'utils/axios';
import { IBook } from 'types/ibooks';
// ==============================|| SAMPLE PAGE ||============================== //

const ratings = [4.82, 4.77, 4.76, 4.75, 4.74, 4.73, 4.72, 4.71, 4.68];
const topRated: Array<IBook> = new Array<IBook>();

export default function HomePage() {
  useEffect(() => {
    ratings.forEach((val) => {
      axios.get(`/rating/${val.toString()}`).then((response) => {
        topRated.push(response.data.books);
      });
    });
  });
  return (
    <MainCard title="Sample Card">
      <BookList bookData={topRated}></BookList>
    </MainCard>
  );
}
