'use client';

import * as React from 'react';

import SearchBar from 'components/Search/SearchBar';
import SearchMenu from 'components/Search/SearchMenu';

import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

export default function SearchForm({
  setQuery,
  setFilter,
  handleSearch
}: {
  setQuery: Function;
  setFilter: Function;
  handleSearch: Function;
}) {
  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'center' }} alignContent="center">
        <SearchBar setQuery={setQuery} clickHandler={handleSearch}></SearchBar>
        <Typography align="center" variant="body1">
          by
        </Typography>
        <SearchMenu setFilter={setFilter}></SearchMenu>
      </Stack>
    </>
  );
}
