'use client';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

// project imports
import { SearchFilters } from 'types/search';

export default function SearchBar(props: { searchHandler: (query: string, filter: SearchFilters | null) => void }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = (theQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (theQuery) {
      params.set('query', theQuery);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleInput = () => {
    props.searchHandler(searchParams.get('query') || '', (searchParams.get('filter') as SearchFilters) || null);
  };

  return (
    <>
      <TextField
        label="Search"
        id="search-bar"
        onChange={(e) => handleChange(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleInput();
          }
        }}
        defaultValue={searchParams.get('query') || ''}
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="Search" onClick={() => handleInput()} edge="end">
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </>
  );
}
