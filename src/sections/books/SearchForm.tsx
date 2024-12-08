'use client';

import * as React from 'react';

import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import { SearchFilters } from 'types/search';
import { useSearchParams } from 'next/navigation';

// project imports
import axios from 'utils/axios';
import { convertBadIBook } from 'utils/toIBook';
import { useEffect } from 'react';
import SearchBar from 'components/Search/SearchBar';
import SearchMenu from 'components/Search/SearchMenu';
import { EMPTY_ALERT } from 'types/alerts';

export default function SearchForm(props: { resultSetter: Function; pageHandler: Function; alertSetter: Function }) {

  const searchParams = useSearchParams();

  useEffect(() => {
    handleSearch(null, null);
  }, []);

  const onError = (message: string) => {
    props.alertSetter({
      showAlert: true,
      alertMessage: 'Search Failed: ' + message,
      alertSeverity: 'info'
    });
  };

  const handleSearch = (query: string | null, filter: SearchFilters | null) => {
    if (!query && searchParams.get('query')) {
      query = searchParams.get('query') as string;
    }
    if ((!filter || filter === null) && searchParams.get('filter')) {
      filter = searchParams.get('filter') as SearchFilters;
    }
    if (query && filter) {
      axios
        .get(`/books/${filter}/${query}`)
        .then((response) => {
          if (filter === SearchFilters.author) {
            query.replace(' ', '+');
          }
          if (filter === SearchFilters.isbn) {
            props.resultSetter([response.data.books]);
          } else {
            props.resultSetter(response.data.map(convertBadIBook));
          }
          props.pageHandler(1);
          props.alertSetter(EMPTY_ALERT);
        })
        .catch((error) => {
          props.resultSetter(undefined);
          onError(error.message);
        });
    }
  };
  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'center' }} alignContent="center">
        <SearchBar searchHandler={handleSearch}></SearchBar>
        <Typography align="center" variant="body1">
          by
        </Typography>
        <SearchMenu searchHandler={handleSearch}></SearchMenu>
      </Stack>
    </>
  );
}
