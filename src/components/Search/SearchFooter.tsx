'use client';

import * as React from 'react';

import { Box } from '@mui/system';
import { Pagination } from '@mui/material';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchFooter(props: {
  pageChangeHandler: Function;
  currentPage: number;
  totalPages: number;
  pageSizeSetter: Function;
  pageSize: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.get('page')) {
      params.set('page', '1');
      replace(`${pathname}?${params.toString()}`);
    } else {
      handleChange(parseInt(params.get('page') as string));
    }
  }, []);

  const handleChange = (thePage: number) => {
    const params = new URLSearchParams(searchParams);
    props.pageChangeHandler(thePage);
    if (thePage) {
      params.set('page', thePage.toString());
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 3
        }}
      >
        <Pagination count={props.totalPages} page={props.currentPage} onChange={(_, page) => handleChange(page)} color="primary" />
      </Box>
    </>
  );
}
