import React, {PureComponent} from 'react';
import {Layout} from 'antd';


const {Footer} = Layout;


export class MyFooter extends PureComponent {
  render() {
    return (
      <Footer style={{textAlign: 'center'}}>
        <span className='footerText'>
          Copyright (c) 2018 ArianX
        </span>
      </Footer>
    )
  }
}