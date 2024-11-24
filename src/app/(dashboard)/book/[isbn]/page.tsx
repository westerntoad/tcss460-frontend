'use client';
import { useParams } from 'next/navigation';
import BookPage from 'views/book';

export default function Page() {
  const params = useParams();
  const value = params.isbn as string;

  return <BookPage isbn={value} />;
}
