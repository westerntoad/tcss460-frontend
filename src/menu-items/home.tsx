// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import HomeOutlined from '@ant-design/icons/HomeOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { HomeOutlined };

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const home: NavItemType = {
  id: 'sample-page',
  title: <FormattedMessage id="sample-page" />,
  type: 'group',
  url: '/welcome',
  icon: icons.HomeOutlined
};

export default home;
