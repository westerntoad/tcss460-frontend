'use client';

import * as React from 'react';

import SearchForm from '../../sections/books/SearchForm';
import { Box, Container } from '@mui/system';
import { Divider } from '@mui/material';
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { SearchFilters } from 'types/search';
import { IBook } from 'types/ibooks';
import { BadIBook } from 'types/ibooks';
import axios from 'utils/axios';
import BookList from 'sections/books/BookList';

export default function SearchPage() {
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<SearchFilters>(SearchFilters.title);
  const [results, setResults] = useState<IBook[] | undefined>();
  const handleSearch = (e: MouseEvent) => {
    axios
      .get(`/books/${filter}/${query}`)
      .then((response) => {
        if (filter === SearchFilters.author) {
          query.replace(' ', '+');
        }
        if (filter === SearchFilters.isbn) {
          setResults([response.data.books]);
        } else {
          setResults(
            response.data.map((book: BadIBook): IBook => {
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
            })
          );
        }
        console.log('BACKEND HIT, RESPONSE: ' + JSON.stringify(response.data));
      })
      .catch((error) => {
        setResults(undefined);
        console.log(error + 'handle error here');
      });
  };

  const setQueryWrapper = (theQuery: string) => {
    setQuery(theQuery);
    console.log('QUERY HAS BEEN CHANGED TO: ' + theQuery);
  };
  const setFilterWrapper = (theFilter: SearchFilters) => {
    setFilter(theFilter);
    console.log('FILTER HAS BEEN CHANGED TO: ' + theFilter);
  };

  useEffect(() => {
    console.log(filter);
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    handleSearch(clickEvent);
  }, [filter]);

  return (
    <>
      <MainCard>
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <SearchForm setQuery={setQueryWrapper} setFilter={setFilterWrapper} handleSearch={handleSearch}></SearchForm>
        </Box>
        <Divider sx={{ paddingTop: 0.5, paddingBottom: 0.5, margin: 3 }} />
        <Container maxWidth="lg">{results !== undefined ? <BookList bookData={results} /> : null}</Container>
      </MainCard>
    </>
  );
}
