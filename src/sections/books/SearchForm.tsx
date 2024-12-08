'use client';

import * as React from 'react';

import SearchBar from 'components/Search/SearchBar';
import SearchMenu from 'components/Search/SearchMenu';

import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import { SearchFilters } from 'types/search';

export default function SearchForm(props: {
  setQuery: Function;
  setFilter: Function;
  handleSearch: Function;
  filterValue: SearchFilters;
  param: string;
}) {
  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'center' }} alignContent="center">
        <SearchBar setQuery={props.setQuery} clickHandler={props.handleSearch} param={props.param}></SearchBar>
        <Typography align="center" variant="body1">
          by
        </Typography>
        <SearchMenu setFilter={props.setFilter} filterValue={props.filterValue}></SearchMenu>
      </Stack>
    </>
  );
}
