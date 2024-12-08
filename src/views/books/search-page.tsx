/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';

import SearchForm from '../../sections/books/SearchForm';
import { Box, Container } from '@mui/system';
import { Divider } from '@mui/material';
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Project Imports
import { SearchFilters } from 'types/search';
import { IBook } from 'types/ibooks';
import axios from 'utils/axios';
import BookList from 'sections/books/BookList';
import { convertBadIBook } from 'utils/toIBook';

export default function SearchPage() {
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<SearchFilters>(SearchFilters.title);
  const [results, setResults] = useState<IBook[] | undefined>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Casts the "BadIBook" to a normal "IBook" when querying the backend, setting results rerenders BookList component
  const handleSearch = (_: MouseEvent) => {
    axios
      .get(`/books/${filter}/${query}`)
      .then((response) => {
        if (filter === SearchFilters.author) {
          query.replace(' ', '+');
        }
        if (filter === SearchFilters.isbn) {
          setResults([response.data.books]);
        } else {
          setResults(response.data.map(convertBadIBook));
        }
        console.log('BACKEND HIT, RESPONSE: ' + JSON.stringify(response.data));
      })
      .catch((error) => {
        setResults(undefined);
        console.log(error + 'handle error here');
      });
  };

  // Using wrappers as to be able to pass a simple "Function" rather than a "Dispatch<SetStateAction<String>>"
  const setQueryWrapper = (theQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (theQuery) {
      params.set('query', theQuery);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    setQuery(theQuery);
  };
  const setFilterWrapper = (theFilter: SearchFilters) => {
    const params = new URLSearchParams(searchParams);
    if (theFilter) {
      params.set('filter', theFilter);
    } else {
      params.delete('filter');
    }
    replace(`${pathname}?${params.toString()}`);
    setFilter(theFilter);
  };

  // Uses the filter as a dependency as to create a fake search when a filter is chosen
  useEffect(() => {
    console.log(filter);
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    handleSearch(clickEvent);
  }, [filter]);

  // allows shared queries by URL, using as reference: https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
  useEffect(() => {
    setQuery(searchParams.get('query')?.toString() || '');
    setFilter((searchParams.get('filter')?.toString() as SearchFilters) || SearchFilters.title);
    if (query) {
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      handleSearch(clickEvent);
    }
  }, []);

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
          <SearchForm
            setQuery={setQueryWrapper}
            setFilter={setFilterWrapper}
            handleSearch={handleSearch}
            filterValue={filter}
            param={query || ''}
          ></SearchForm>
        </Box>
        <Divider sx={{ paddingTop: 0.5, paddingBottom: 0.5, margin: 3 }} />
        <Container maxWidth="lg">{results !== undefined ? <BookList bookData={results} /> : null}</Container>
      </MainCard>
    </>
  );
}
