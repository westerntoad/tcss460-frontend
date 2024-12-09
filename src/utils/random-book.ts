import axios from 'utils/axios';

export default function randomBook() {
  const numBooks = 9_125;
  axios
    .get(`/books/all/?limit=1&offset=${Math.floor(Math.random() * numBooks)}`)
    .then((response) => {
      return response.data.books;
    })
    .catch((error) => console.error(error));
}