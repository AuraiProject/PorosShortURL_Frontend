import React, {Component} from 'react';
import {Layout} from 'antd';

import {MyHeader} from "../../components/header";
import {MyFooter} from "../../components/footer";

import "./base.css";


const {Content} = Layout;


export class App extends Component {
  render() {
    return (
      <Layout>
        <MyHeader/>
        <Content className='content'>
          {this.props.children}
        </Content>
        <MyFooter/>
      </Layout>
    )
  }
}