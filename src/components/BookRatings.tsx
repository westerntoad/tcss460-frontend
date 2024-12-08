import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import React from 'react';

import { IRatings } from 'types/ibooks';

interface Props {
  ratings: IRatings;
}

interface SingleRatingProp {
  label: string;
  ratingCount: number;
  total: number;
}

function RatingBar({ label, ratingCount, total }: SingleRatingProp) {
  return (
    <Stack direction="row" spacing={2}>
      <Typography>{label}</Typography>
      <Tooltip title={ratingCount}>
        <Box
          component="section"
          sx={{
            p: 0.5,
            width: `${(ratingCount / total) * 20}rem`,
            background: '#faaf00',
            border: '2px solid #e69b00',
            '&:hover': {
              bgcolor: '#e69b00'
            }
          }}
        />
      </Tooltip>
    </Stack>
  );
}

export default function BookPage({ ratings }: Props) {
  return (
    <>
      <Stack direction="row" sx={{ justifyContent: 'flex-start', alignItems: 'center' }} spacing={2}>
        <Typography variant="h5">{Math.round(+ratings.average * 100) / 100}</Typography>
        <Rating name="book-rating" readOnly value={ratings.average} precision={0.2} />
        <Typography variant="body1">{ratings.count + ' Total Ratings'}</Typography>
      </Stack>
      <RatingBar total={ratings.count} label="1" ratingCount={ratings.rating_1} />
      <RatingBar total={ratings.count} label="2" ratingCount={ratings.rating_2} />
      <RatingBar total={ratings.count} label="3" ratingCount={ratings.rating_3} />
      <RatingBar total={ratings.count} label="4" ratingCount={ratings.rating_4} />
      <RatingBar total={ratings.count} label="5" ratingCount={ratings.rating_5} />
    </>
  );
}
