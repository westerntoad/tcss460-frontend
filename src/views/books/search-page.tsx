/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';

import SearchForm from '../../sections/books/SearchForm';
import { Box, Container } from '@mui/system';
import { Alert, Divider } from '@mui/material';
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

// Project Imports
import { IBook } from 'types/ibooks';
import BookList from 'sections/books/BookList';
import SearchFooter from 'components/Search/SearchFooter';
import { IAlert, EMPTY_ALERT } from 'types/alerts';
import navProps from 'types/navs';

export default function SearchPage() {

  const [results, setResults] = useState<IBook[] | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = React.useState(EMPTY_ALERT);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.get('size')) {
      params.set('size', '15');
      replace(`${pathName}?${params.toString()}`);
    }
  }, []);

  const pageSize = parseInt(searchParams.get('size') as string) || 25;

  const navObj: navProps = {
    searchParams: searchParams,
    replace: replace,
    pathname: pathName
  };

  const totalPages = results ? Math.ceil(results.length / pageSize) : 0;

  const paginatedResults = results ? results.slice((currentPage - 1) * pageSize, currentPage * pageSize) : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const errorWrapper = (theAlert: IAlert) => {
    setAlert(theAlert);
  };

  return (
    <>
      <MainCard>
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <SearchForm nav={navObj} alertSetter={errorWrapper} resultSetter={setResults} pageHandler={handlePageChange}></SearchForm>
        </Box>
        <Divider sx={{ paddingTop: 0.5, paddingBottom: 0.5, margin: 3 }} />
        <Container maxWidth="lg">
          {alert.alertMessage && (
            <Alert severity={alert.alertSeverity as any} sx={{ marginBottom: 3 }} onClose={() => setAlert(EMPTY_ALERT)}>
              {alert.alertMessage}
            </Alert>
          )}
          {results !== undefined ? (
            <>
              <BookList bookData={paginatedResults} />
              <SearchFooter
                nav={navObj}
                pageChangeHandler={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
              />
            </>
          ) : null}
        </Container>
      </MainCard>
    </>
  );
}
