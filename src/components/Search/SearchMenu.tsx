'use client';

import { MenuItem, Select } from '@mui/material';
import { SearchFilters } from 'types/search';

export default function SearchMenu(props: { setFilter: Function; filterValue: SearchFilters }) {
  return (
    <>
      <Select
        defaultValue={SearchFilters.title}
        value={props.filterValue}
        onChange={(e) => props.setFilter(e.target.value)}
        sx={{ m: 1, width: '15ch', height: '41.133px' }}
      >
        <MenuItem value={SearchFilters.title}>Title</MenuItem>
        <MenuItem value={SearchFilters.author}>Author</MenuItem>
        <MenuItem value={SearchFilters.isbn}>ISBN13</MenuItem>
        <MenuItem value={SearchFilters.rating}>Rating</MenuItem>
        <MenuItem value={SearchFilters.year}>Year</MenuItem>
      </Select>
    </>
  );
}
