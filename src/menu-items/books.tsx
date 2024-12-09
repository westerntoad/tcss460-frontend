// third-party
import { FormattedMessage } from 'react-intl';

// assets
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { SearchOutlined, UnorderedListOutlined, PlusSquareOutlined  };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const books: NavItemType = {
  id: 'books',
  title: <FormattedMessage id="books" />,
  type: 'group',
  children: [
    {
      id: 'add-book',
      title: <FormattedMessage id="add-book" />,
      type: 'item',
      url: '/added',
      icon: icons.PlusSquareOutlined
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
