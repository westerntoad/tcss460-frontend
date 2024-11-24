// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import SearchOutlined from '@ant-design/icons/SearchOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { SearchOutlined };

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const searchPage: NavItemType = {
  id: 'search-page',
  title: <FormattedMessage id="search-page" />,
  type: 'group',
  url: '/search',
  icon: icons.SearchOutlined
};

export default searchPage;
