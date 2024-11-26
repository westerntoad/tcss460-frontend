// project import
import samplePage from './sample-page';
import other from './other';
import pages from './messages';
import books from './books';
// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [books, samplePage, pages, other]
};

export default menuItems;
