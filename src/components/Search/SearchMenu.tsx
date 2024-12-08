'use client';

import { MenuItem, Select } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// project imports
import { SearchFilters } from 'types/search';

export default function SearchMenu(props: { searchHandler: (query: string, filter: SearchFilters | null) => void }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.get('filter')) {
      params.set('filter', SearchFilters.title);
      replace(`${pathname}?${params.toString()}`);
    }
  }, []);
  const handleChange = (theFilter: SearchFilters) => {
    const params = new URLSearchParams(searchParams);
    params.set('filter', theFilter);
    replace(`${pathname}?${params.toString()}`);
    props.searchHandler(params.get('query') || '', theFilter);
  };

  return (
    <>
      <Select
        defaultValue={SearchFilters.title}
        value={searchParams.get('filter')}
        onChange={(e) => {
          handleChange(e.target.value as SearchFilters);
        }}
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
