// project import
import books from './books';
import home from './home';
// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [books, home]
};

export default menuItems;
