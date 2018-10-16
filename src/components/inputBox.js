import React, {Component} from 'react';
import {Icon} from 'antd';


export class InputBox extends Component {
  render() {
    const {inputBoxIconClassName} = this.props;
    return (
      <div className='inputBox'>
        <p className='siteLogo'>
          <Icon type='radar-chart' style={{fontSize: '100px'}} className={inputBoxIconClassName}/>
        </p>
        <p className='inputBoxTitle'>
          <span>{this.props.title}</span>
        </p>
        <p className='inputBoxContent'>
          {this.props.children}
        </p>
      </div>
    )
  }
}