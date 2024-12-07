'use client';

import { useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SearchFilters } from 'types/search';

export default function SearchMenu({ setFilter }: { setFilter: Function }) {
  const [value, setValue] = useState('Title');

  const handleChange = (newValue: SelectChangeEvent) => {
    setFilter(newValue.target.value);
    setValue(newValue.target.value);
  };

  return (
    <>
      <Select
        defaultValue={SearchFilters.title}
        value={value}
        onChange={(e) => handleChange(e)}
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
