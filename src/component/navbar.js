import React, { Component, useState } from 'react';
import { Layout, Menu, Breadcrumb,Row, Col, Tooltip } from 'antd';
import { render } from '@testing-library/react';
import '../App.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

const Navbar = (props) =>{
    render()
    {
        return(
            <>  
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
      </>
        );
    
    }
}
export default Navbar;
