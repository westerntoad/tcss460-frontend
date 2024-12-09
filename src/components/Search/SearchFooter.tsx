'use client';

import * as React from 'react';

import { Box } from '@mui/system';
import { FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material';
import { useEffect } from 'react';
import navProps from 'types/navs';

export default function SearchFooter(props: {
  pageChangeHandler: Function;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  nav: navProps;
}) {

  useEffect(() => {
    const params = new URLSearchParams(props.nav.searchParams);
    if (!params.get('page')) {
      params.set('page', '1');
      props.nav.replace(`${props.nav.pathname}?${params.toString()}`);
    } else {
      handleChange(parseInt(params.get('page') as string));
    }
  }, []);

  const handleChange = (thePage: number) => {
    const params = new URLSearchParams(props.nav.searchParams);
    props.pageChangeHandler(thePage);
    if (thePage) {
      params.set('page', thePage.toString());
      props.nav.replace(`${props.nav.pathname}?${params.toString()}`);
    }
  };

  const pageSizeWrapper = (theSize: number) => {
    const params = new URLSearchParams(props.nav.searchParams);
    if (theSize) {
      params.set('size', theSize.toString());
    }
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          marginTop: 3
        }}
      >
        <FormControl
          sx={{
            position: 'absolute',
            right: '0px',
            transform: 'translateY(-50%)',
            top: '50%',
            width: '85px'
          }}
        >
          <InputLabel id="page-size-label">Page Size</InputLabel>
          <Select labelId="page-size-label" value={props.pageSize} onChange={(e) => pageSizeWrapper(e.target.value as number)}>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={45}>45</MenuItem>
            <MenuItem value={60}>60</MenuItem>
          </Select>
        </FormControl>
        <Pagination count={props.totalPages} page={props.currentPage} onChange={(_, page) => handleChange(page)} color="primary" />
      </Box>
    </>
  );
}
