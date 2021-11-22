import './index.css';
import React from 'react';
import { Layout, Menu } from 'antd';

//icon
import { 
  Text,
  Art,
  Upload,
  Notes,
  TeamNames,
  Color
} from '../../icons';

const menus = [
  {
    key: 'text',
    title: 'Add Text',
    icon: Text,
  },
  {
    key: 'template',
    title: 'Use Template',
    icon: Art,
  },
  {
    key: 'upload',
    title: 'Upload design',
    icon: Upload,
  },
  {
    key: 'colors',
    title: 'Product Colors',
    icon: Color,
  },
  {
    key: 'team',
    title: 'Add Team names',
    icon: TeamNames,
  },
  {
    key: 'notes',
    title: 'Add Notes',
    icon: Notes
  },
]

const SideBar = ({ setSelectedMenu, selectedMenu }) => {
  const { Sider } = Layout;

  const createMenus = () => {
    return menus.map(menu => {
      const { key, title, icon:Icon } = menu;

      return (
        <Menu.Item key={key} data-testid='side-menu' >
          <div className='text-center'>
            <div>
                <Icon fill={selectedMenu === key || (key === 'text' && selectedMenu === 'font') ? '#007BFF' : 'white' } />
            </div>
            <p className='ml-2 px-3 dl-mt-12 text-wrap text-center'>{title}</p>
          </div>
        </Menu.Item>
      )
    })
  }

  const onSelect = (key) => {
    setSelectedMenu(key);
  }
  
  return (
    <Sider
      width={100}
      className='sidebar-component'
      breakpoint='md'
      collapsedWidth='0'
    >
      <Menu mode='inline' selectedKeys={[selectedMenu === 'font' ? 'text' : selectedMenu]} onSelect={({ key }) => onSelect(key)}>
        {createMenus()}
      </Menu>
    </Sider>
  );
}

export default SideBar;
