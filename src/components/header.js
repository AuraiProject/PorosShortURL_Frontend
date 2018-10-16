import React, {PureComponent} from 'react';
import {Menu, Icon} from 'antd';


export class MyHeader extends PureComponent {


  render() {
    return (
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
      >
        <span className='logo'>
          <Icon type='fire' style={{fontSize: '20px', color: "aqua"}} className="logoIcon"/>
          <i>Short Url</i>
        </span>
        <Menu.Item key="3" className='menuItem'>
          <Icon type="api" theme="outlined"/>
          <span className='menuItemText'>API</span>
        </Menu.Item>
        <Menu.Item key="2" className='menuItem'>
          <Icon type="line-chart" theme="outlined"/>
          <span className="menuItemText">Restore</span>
        </Menu.Item>
        <Menu.Item key="1" className='menuItem'>
          <Icon type="dot-chart" theme="outlined"/>
          <span className='menuItemText'>Generate</span>
        </Menu.Item>
      </Menu>
    )
  }
}