'use client';

import React from 'react';

// next

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

import axios from 'utils/axios';

export default function SendBook({ onSuccess, onError }: { onSuccess: () => void; onError: (msg: string) => void }) {
  return (
    <>
      <Formik
        initialValues={{
          isbn13: '',
          title: '',
          authors: '',
          publication_year: 0,
          rating_1: 0,
          rating_2: 0,
          rating_3: 0,
          rating_4: 0,
          rating_5: 0,
          image_url: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png',
          image_small_url: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          isbn13: Yup.string().max(255).required('ISBN13 is required'),
          title: Yup.string().max(255).required('Title is required'),
          authors: Yup.string().max(255).required('Author(s) is required'),
          publication_year: Yup.number().min(0, 'Must be greater than 0').required('Publicatiob Year is required'),
          rating_1: Yup.number()
            .min(0, 'Must be greater than 0')
            .required('Rating 1 is required')
            .max(2147483647, 'Must be less than 2,147,483,647'),
          rating_2: Yup.number()
            .min(0, 'Must be greater than 0')
            .required('Rating 2 is required')
            .max(2147483647, 'Must be less than 2,147,483,647'),
          rating_3: Yup.number()
            .min(0, 'Must be greater than 0')
            .required('Rating 3 is required')
            .max(2147483647, 'Must be less than 2,147,483,647'),
          rating_4: Yup.number()
            .min(0, 'Must be greater than 0')
            .required('Rating 4 is required')
            .max(2147483647, 'Must be less than 2,147,483,647'),
          rating_5: Yup.number()
            .min(0, 'Must be greater than 0')
            .required('Rating 5 is required')
            .max(2147483647, 'Must be less than 2,147,483,647'),
          image_url: Yup.string().max(255).required('Image Url is required'),
          image_small_url: Yup.string().max(255).required('Image Small Url is required')
        })}
        onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
          console.dir(values);

          axios
            .post('/books/new', {
              isbn13: values.isbn13,
              title: values.title,
              authors: values.authors,
              publication_year: values.publication_year,
              rating_1_star: values.rating_1,
              rating_2_star: values.rating_2,
              rating_3_star: values.rating_3,
              rating_4_star: values.rating_4,
              rating_5_star: values.rating_5,
              image_url: values.image_url,
              image_small_url: values.image_small_url
            })
            .then((response) => {
              setSubmitting(false);
              resetForm({
                values: {
                  isbn13: '',
                  title: '',
                  authors: '',
                  publication_year: 0,
                  rating_1: 0,
                  rating_2: 0,
                  rating_3: 0,
                  rating_4: 0,
                  rating_5: 0,
                  image_url: '',
                  image_small_url: '',
                  submit: null
                }
              });
              onSuccess();
            })
            .catch((error) => {
              console.error(error);
              setErrors({ isbn13: error.message });
              setSubmitting(false);
              onError(error.message);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="isbn13">ISBN13</InputLabel>
                  <OutlinedInput
                    id="isbn13-id"
                    type="text"
                    value={values.isbn13}
                    name="isbn13"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the ISBN13"
                    fullWidth
                    error={Boolean(touched.isbn13 && errors.isbn13)}
                  />
                </Stack>
                {touched.isbn13 && errors.isbn13 && (
                  <FormHelperText error id="standard-weight-helper-text-isbn13-book-send">
                    {errors.isbn13}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                    id="title-id"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter a title"
                  />
                </Stack>
                {touched.title && errors.title && (
                  <FormHelperText error id="standard-weight-helper-text-title-book-send">
                    {errors.title}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="authors">Author(s)</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.authors && errors.authors)}
                    id="authors-id"
                    type="text"
                    value={values.authors}
                    name="authors"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter author(s)"
                  />
                </Stack>
                {touched.authors && errors.authors && (
                  <FormHelperText error id="standard-weight-helper-text-authors-book-send">
                    {errors.authors}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="publication_year">Publication Year</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.publication_year && errors.publication_year)}
                    id="publication_year-id"
                    type="number"
                    value={values.publication_year}
                    name="publication_year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Publication Year"
                  />
                </Stack>
                {touched.publication_year && errors.publication_year && (
                  <FormHelperText error id="standard-weight-helper-text-publication_year-book-send">
                    {errors.publication_year}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rating_1">Ratings 1</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rating_1 && errors.rating_1)}
                    id="rating_1-id"
                    type="number"
                    value={values.rating_1}
                    name="rating_1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Ratings 1 "
                  />
                </Stack>
                {touched.rating_1 && errors.rating_1 && (
                  <FormHelperText error id="standard-weight-helper-text-rating_1-book-send">
                    {errors.rating_1}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rating_2">Ratings 2</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rating_2 && errors.rating_2)}
                    id="rating_2-id"
                    type="number"
                    value={values.rating_2}
                    name="rating_2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Ratings 2"
                  />
                </Stack>
                {touched.rating_2 && errors.rating_2 && (
                  <FormHelperText error id="standard-weight-helper-text-rating_2-book-send">
                    {errors.rating_2}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rating_3">Ratings 3</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rating_3 && errors.rating_3)}
                    id="rating_3-id"
                    type="number"
                    value={values.rating_3}
                    name="rating_3"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Ratings 3"
                  />
                </Stack>
                {touched.rating_3 && errors.rating_3 && (
                  <FormHelperText error id="standard-weight-helper-text-rating_3-book-send">
                    {errors.rating_3}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rating_4">Ratings 4</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rating_4 && errors.rating_4)}
                    id="rating_4-id"
                    type="number"
                    value={values.rating_4}
                    name="rating_4"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Ratings 4"
                  />
                </Stack>
                {touched.rating_4 && errors.rating_4 && (
                  <FormHelperText error id="standard-weight-helper-text-rating_4-book-send">
                    {errors.rating_4}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rating_5">Ratings 5</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rating_5 && errors.rating_5)}
                    id="rating_5-id"
                    type="number"
                    value={values.rating_5}
                    name="rating_5"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Ratings 5"
                  />
                </Stack>
                {touched.rating_5 && errors.rating_5 && (
                  <FormHelperText error id="standard-weight-helper-text-rating_5-book-send">
                    {errors.rating_5}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="image_url">Image Url</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.image_url && errors.image_url)}
                    id="image_url-id"
                    type="text"
                    value={values.image_url}
                    name="image_url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter a Image Url"
                  />
                </Stack>
                {touched.image_url && errors.image_url && (
                  <FormHelperText error id="standard-weight-helper-text-image_url-book-send">
                    {errors.image_url}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="image_small_url">Image Small Url</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.image_small_url && errors.image_small_url)}
                    id="image_small_url-id"
                    type="text"
                    value={values.image_small_url}
                    name="image_small_url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter a Image Small Url"
                  />
                </Stack>
                {touched.image_small_url && errors.image_small_url && (
                  <FormHelperText error id="standard-weight-helper-text-image_small_url-book-send">
                    {errors.image_small_url}
                  </FormHelperText>
                )}
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    SEND!
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
