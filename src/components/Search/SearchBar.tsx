'use client';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

export default function SearchBar({ setQuery, clickHandler }: { setQuery: Function; clickHandler: Function }) {

  return (
    <>
      <TextField
        label="Search"
        id="search-bar"
        onChange={(e) => setQuery(e.target.value)}
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="Search" onClick={(_) => clickHandler()} edge="end">
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </>
  );
}
