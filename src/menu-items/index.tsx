// project import
import samplePage from './sample-page';
import other from './other';
import pages from './messages';
import search from './search';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [search, samplePage, pages, other]
};

export default menuItems;
