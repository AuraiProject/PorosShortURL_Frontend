import React, {PureComponent} from 'react';
import {Menu, Icon, Layout, Row, Col} from 'antd';
import {withRouter} from 'react-router-dom';


class _Logo extends PureComponent {
  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div onClick={this.handleClick} {...this.props}>
        <Icon type='fire' style={{fontSize: '20px', color: "aqua"}} className="logoIcon"/>
        <i>Short Url</i>
      </div>
    )
  }
}


const Logo = withRouter(_Logo);


class _MyHeader extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      selected: [props.location.pathname]
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.selected !== nextProps.location.pathname && this.setState({
      selected: [nextProps.location.pathname]
    });
  }

  handleClick = (e) => {
    this.props.history.push(e.key);
  };

  render() {
    return (
      <Layout.Header className="myHeader">
        <Row>
          <Col xs={0} md={12}>
            <Logo className='logo wideLogo'/>
          </Col>
          <Col xs={24} md={0}>
            <Logo className='logo narrowLogo'/>
          </Col>
          <Col xs={24} md={12}>
            <Menu
              onClick={this.handleClick}
              theme="light"
              mode="horizontal"
              selectedKeys={this.state.selected}
              className="navMenu"
              multiple={false}
            >
              <Menu.Item key='/api' className='menuItem'>
                <Icon type="api" theme="outlined"/>
                <span className='menuItemText'>API</span>
              </Menu.Item>
              <Menu.Item key="/restore" className='menuItem'>
                <Icon type="line-chart" theme="outlined"/>
                <span className="menuItemText">Restore</span>
              </Menu.Item>
              <Menu.Item key="/" className='menuItem'>
                <Icon type="dot-chart" theme="outlined"/>
                <span className='menuItemText'>Generate</span>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Layout.Header>
    )
  }
}


export const MyHeader = withRouter(_MyHeader);