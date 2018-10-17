import React, {PureComponent} from 'react';
import {Button, Icon, Modal} from "antd";


export class LoadingButton extends PureComponent {
  render() {
    const {loading, title, ...rest} = this.props;
    const settings = {
      type: "primary",
      htmlType: "submit",
      size: "large",
      style: {borderRadius: "100px"},
      ghost: true,
    };
    return loading ? (
      <Button {...settings} disabled {...rest}>
        <Icon type="loading" theme="outlined"/>
        Loading...
      </Button>
    ) : (
      <Button {...settings} {...rest}>
        {title}
      </Button>
    );
  }
}


export function successModal(info, jump = false) {
  Modal.success({
    title: 'Operation Success. Results:',
    content: (
      <div>
        <code>
          {
            JSON.stringify(info, null, 4)
          }
        </code>
        {
          jump ? (
            <div>
              <hr/>
              <a href={info.url} target="_blank" style={{
                textDecoration: null,
                color: "#66ccff"
              }}>Jump to the origin url?</a>
            </div>
          ) : null
        }
      </div>
    )
  })
}


export function errorModal(info) {
  Modal.warn({
    title: 'Operation error. Error info: ',
    content: (
      <div>
        <code>
          {
            JSON.stringify(info, null, 4)
          }
        </code>
      </div>
    )
  })
}