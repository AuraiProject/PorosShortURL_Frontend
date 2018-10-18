import React, {PureComponent} from 'react';
import {Button, Icon, Modal, message} from "antd";


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


class SuccessModalContent extends PureComponent {
  copyShortUrl = () => {
    let hiddenInput = document.getElementById('hiddenInput');
    hiddenInput.value = this.props.info.short_url;
    hiddenInput.select();
    document.execCommand('copy');
    message.info('Short url has been copied to your Clipboard.');
  };

  render() {
    const {info, jump, copyUrl} = this.props;
    return (
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
        {
          copyUrl ? (
            <div>
              <hr/>
              <a href='#' style={{
                textDecoration: null,
                color: "#66ccff"
              }} onClick={this.copyShortUrl}
              >Copy the Short Url?</a>
              <textarea id='hiddenInput' style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0,
                zIndex: -10000
              }}/>
            </div>
          ) : null
        }
      </div>
    )
  }
}


export function successModal(info, jump = false, copyUrl = false) {
  Modal.success({
    title: 'Operation Success. Results:',
    content: (
      <SuccessModalContent info={info} jump={jump} copyUrl={copyUrl}/>
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