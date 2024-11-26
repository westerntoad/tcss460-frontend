// third-party
import { FormattedMessage } from 'react-intl';

// assets
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { SearchOutlined, UnorderedListOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const books: NavItemType = {
  id: 'books',
  title: <FormattedMessage id="books" />,
  type: 'group',
  children: [
    {
      id: 'paginate-temp',
      title: <FormattedMessage id="paginate-temp" />,
      type: 'item',
      url: '/paginated',
      icon: icons.UnorderedListOutlined
    },
    {
      id: 'search-page',
      title: <FormattedMessage id="search-page" />,
      type: 'item',
      url: '/search',
      icon: icons.SearchOutlined
    }
  ]
};

export default books;
