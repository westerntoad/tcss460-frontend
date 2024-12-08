'use client';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

export default function SearchBar(props: { setQuery: Function; clickHandler: Function; param: string }) {
  return (
    <>
      <TextField
        label="Search"
        id="search-bar"
        onChange={(e) => props.setQuery(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            props.clickHandler();
          }
        }}
        defaultValue={props.param}
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="Search" onClick={(_) => props.clickHandler()} edge="end">
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </>
  );
}
