'use client';
import MainCard from 'components/MainCard';
import * as React from 'react';
import { Button, Link, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import HomePage from 'views/home-page';

// ==============================|| PAGE ||============================== //

export default function HomeViewPage() {
  return (
    <MainCard>
      <Typography variant="h4">TCSS 460: Client/Server Programming Final Project</Typography>
      <Typography variant="body1" sx={{paddingTop: '1rem'}}>
        This project was completed in Fall of 2024 by Jovany Cardoza-Aguilar, Tanner Denson, Abraham Engebretson, & Conner Webber.
        Please check out the source code for this project on <Link href='https://github.com/westerntoad/tcss460-frontend'>GitHub</Link>!
      </Typography>
      <Stack sx={{paddingTop: '1.5rem', paddingBottom: '2rem'}} direction='row' justifyContent={'center'} alignContent={'center'}>
        <Button variant='contained' sx={{ width: '12rem'}} href='/book/random'>I'm feelin' lucky!</Button>
      </Stack>
      <HomePage />
    </MainCard>
  );
}
