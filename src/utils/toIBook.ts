import { BadIBook, IBook } from 'types/ibooks';

export const convertBadIBook = (book: BadIBook): IBook => {
  return {
    isbn13: parseInt(book.isbn13),
    authors: book.authors,
    publication: book.publication_year,
    original_title: book.original_title,
    title: book.title,
    ratings: {
      average: book.rating_avg,
      count: book.rating_count,
      rating_1: book.rating_1_start,
      rating_2: book.rating_2_start,
      rating_3: book.rating_3_start,
      rating_4: book.rating_4_start,
      rating_5: book.rating_5_start
    },
    icons: {
      large: book.image_url,
      small: book.image_small_url
    }
  };
};
