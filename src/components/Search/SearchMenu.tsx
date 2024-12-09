'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';

// project imports
import { SearchFilters } from 'types/search';
import navProps from 'types/navs';

export default function SearchMenu(props: { searchHandler: (query: string, filter: SearchFilters | null) => void; nav: navProps }) {
  useEffect(() => {
    const params = new URLSearchParams(props.nav.searchParams);
    if (!params.get('filter')) {
      params.set('filter', SearchFilters.title);
      props.nav.replace(`${props.nav.pathname}?${params.toString()}`);
    }
  }, []);

  const handleChange = (theFilter: SearchFilters) => {
    const params = new URLSearchParams(props.nav.searchParams);
    params.set('filter', theFilter);
    props.nav.replace(`${props.nav.pathname}?${params.toString()}`);
    props.searchHandler(params.get('query') || '', theFilter);
  };

  return (
    <>
      <FormControl
        sx={{
          width: '15ch',
          m: 1,
          position: 'relative'
        }}
      >
        <InputLabel
          id="filter-label"
          sx={{
            position: 'absolute',
            left: '6px'
          }}
        >
          Filter
        </InputLabel>
        <Select
          labelId="filter-label"
          defaultValue={SearchFilters.title}
          value={props.nav.searchParams.get('filter')}
          onChange={(e) => {
            handleChange(e.target.value as SearchFilters);
          }}
          sx={{
            width: '15ch',
            height: '41.133px'
          }}
          label="Filter"
        >
          <MenuItem value={SearchFilters.title}>Title</MenuItem>
          <MenuItem value={SearchFilters.author}>Author</MenuItem>
          <MenuItem value={SearchFilters.isbn}>ISBN13</MenuItem>
          <MenuItem value={SearchFilters.rating}>Rating</MenuItem>
          <MenuItem value={SearchFilters.year}>Year</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
