import './index.css';
import React from 'react';
import { Layout } from 'antd';

//components
import { NavBar , Footer } from '../index';


const UserLayout = ({ children }) => {
  const { Content } = Layout;

  return (
    <Layout className='layout-container w-100'>
      <NavBar />
      <Layout>
        <Content className='content'>
          {children}
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default UserLayout;
