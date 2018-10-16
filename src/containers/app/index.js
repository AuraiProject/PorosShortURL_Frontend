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
        <div className="myHeader">
          <MyHeader/>
        </div>
        <Content>
        </Content>
        <div className="myFooter">
          <MyFooter/>
        </div>
      </Layout>
    )
  }
}