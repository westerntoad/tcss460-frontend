import * as Yup from 'yup';
import Image from 'next/image';

import MainCard from 'components/MainCard';
import React from 'react';

import { IBook } from 'types/ibooks';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Formik } from 'formik';
import { FormHelperText, Grid, InputLabel, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';

import AnimateButton from 'components/@extended/AnimateButton';
import axios from 'utils/axios';
import { useRouter } from 'next/navigation';

interface Props {
  book: IBook;
  csrfToken: any;
}

interface FieldProps {
  value: any;
  handleBlur: any;
  handleChange: any;
  touched: any;
  touch: any;
  errors: any;
  error: any;
  name: string;
}

function Field({ name, value, handleBlur, handleChange, touch, errors, error }: FieldProps) {
  const title = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <InputLabel htmlFor={`change-${name}`}>{title}</InputLabel>
          <OutlinedInput
            id={`change-${name}`}
            type={name}
            value={value}
            name={name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={`Enter ${name}`}
            fullWidth
            error={Boolean(touch && error)}
          />
        </Stack>
        {touch && error && (
          <FormHelperText error id="standard-weight-helper-text-title-change">
            {error}
          </FormHelperText>
        )}
      </Grid>
      {errors.submit && (
        <Grid item xs={12}>
          <FormHelperText error>{errors.submit}</FormHelperText>
        </Grid>
      )}
    </>
  );
}

export default function ChangeBookPage({ book, csrfToken }: Props) {
  const router = useRouter();
  
  return (
    <MainCard>
      {(book.isbn13 && (
        <>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem sx={{ marginBottom: 10 }} />}>
            <Stack direction="column" spacing={2}>
              <Image src={book.icons.large} width={98} height={147} alt="Book cover" />
              <Button href={`/book/${book.isbn13}`} sx={{ fontSize: 13 }} variant="contained">View Book</Button>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Formik
                initialValues={{
                  title: book.title,
                  authors: book.authors,
                  publication_year: book.publication,
                  image_url: book.icons.large,
                  image_small_url: book.icons.small,
                  rating_1_star: book.ratings.rating_1,
                  rating_2_star: book.ratings.rating_2,
                  rating_3_star: book.ratings.rating_3,
                  rating_4_star: book.ratings.rating_4,
                  rating_5_star: book.ratings.rating_5,
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  title: Yup.string().max(255).required('Title is required'),
                  authors: Yup.string().max(255).required('Author(s) is required'),
                  publication_year: Yup.number().min(0, 'Must be greater than 0').required('Publicatiob Year is required'),
                  image_url: Yup.string().max(255).required('Image Url is required'),
                  image_small_url: Yup.string().max(255).required('Image Small Url is required'),
                  rating_1_star: Yup.number().min(0, 'Must be greater than 0').required('Rating 1 is required'),
                  rating_2_star: Yup.number().min(0, 'Must be greater than 0').required('Rating 2 is required'),
                  rating_3_star: Yup.number().min(0, 'Must be greater than 0').required('Rating 3 is required'),
                  rating_4_star: Yup.number().min(0, 'Must be greater than 0').required('Rating 4 is required'),
                  rating_5_star: Yup.number().min(0, 'Must be greater than 0').required('Rating 5 is required')
                })}
                onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
                  axios
                    .patch(`/books/update/${book.isbn13}`, {
                      title: values.title,
                      authors: values.authors,
                      publication_year: values.publication_year,
                      image_url: values.image_url,
                      image_small_url: values.image_small_url
                    })
                    .then((response) => {
                      axios
                        .patch(`books/update/ratings/${book.isbn13}`, {
                          rating_1_star: values.rating_1_star,
                          rating_2_star: values.rating_2_star,
                          rating_3_star: values.rating_3_star,
                          rating_4_star: values.rating_4_star,
                          rating_5_star: values.rating_5_star
                        })
                        .then((response) => {
                          alert('Successfully altered book!');
                          router.push(`/book/${book.isbn13}`);
                        });
                    })
                    .catch((error) => {
                      console.error(error);
                      alert(error);
                      router.push(`/book/${book.isbn13}`);
                    });
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <Grid container spacing={3}>
                      <Field
                        name="title"
                        value={values.title}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        touch={touched.title}
                        errors={errors}
                        error={errors.title}
                      />
                      <Field
                        name="authors"
                        value={values.authors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        touch={touched.authors}
                        errors={errors}
                        error={errors.authors}
                      />
                      <Field
                        name="publication_year"
                        value={values.publication_year}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touch={touched.publication_year}
                        touched={touched}
                        errors={errors}
                        error={errors.publication_year}
                      />
                      <Field
                        name="image_url"
                        value={values.image_url}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        touch={touched.image_url}
                        errors={errors}
                        error={errors.image_url}
                      />
                      <Field
                        name="image_small_url"
                        value={values.image_small_url}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        touch={touched.image_small_url}
                        errors={errors}
                        error={errors.image_small_url}
                      />
                      <Field
                        name="rating_1_star"
                        value={values.rating_1_star}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        touch={touched.rating_1_star}
                        errors={errors}
                        error={errors.rating_1_star}
                      />
                      <Field
                        name="rating_2_star"
                        value={values.rating_2_star}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        touch={touched.rating_2_star}
                        errors={errors}
                        error={errors.rating_2_star}
                      />
                      <Field
                        name="rating_3_star"
                        value={values.rating_3_star}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        touch={touched.rating_3_star}
                        errors={errors}
                        error={errors.rating_3_star}
                      />
                      <Field
                        name="rating_4_star"
                        value={values.rating_4_star}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        touch={touched.rating_4_star}
                        errors={errors}
                        error={errors.rating_4_star}
                      />
                      <Field
                        name="rating_5_star"
                        value={values.rating_5_star}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched}
                        touch={touched.rating_5_star}
                        errors={errors}
                        error={errors.rating_5_star}
                      />
                      <Grid item xs={12}>
                        <AnimateButton>
                          <Button
                            disableElevation
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Update Book
                          </Button>
                        </AnimateButton>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Stack>
          </Stack>
        </>
      )) ||
        'Loading...'}
    </MainCard>
  );
}
