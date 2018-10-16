import React, {Component} from 'react';
import {Form, Input, Icon} from 'antd';

import {InputBox} from "../../components/inputBox";
import {shortToLong} from "../../urils/api";
import {PasswordModal} from "./passwordModal";
import {successModal, errorModal, LoadingButton} from "../../components/message";
import {formatResult} from "../../urils/format";

const FormItem = Form.Item;


export class _RestoreShortUrl extends Component {
  state = {
    loading: false,
    showModal: false
  };

  constructor(props) {
    super(props);
    this.password = null;
  }

  handleSubmit = (e) => {
    console.log(e);
  };

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  };

  setPassword = (password) => {
    this.password = password;
  };

  formOnBlur = () => {
    const value = this.props.form.getFieldValue('short_url');
    this.props.form.setFields({
      url: {
        value: value,
        errors: null
      }
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div>
        <InputBox inputBoxIconClassName="restoreInputBoxIcon">
          <Form
            onSubmit={this.handleSubmit}
            className='restoreUrlForm'
          >
            <FormItem style={{margin: "10px 0"}}>
              {
                getFieldDecorator('short_url', {
                  rules: [
                    {required: true, message: 'This field is required.'},
                    {
                      pattern: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
                      message: "This field must be a valid url."
                    }
                  ],
                  validateTrigger: false
                })(
                  <Input placeholder="Input the short url." size="large"
                         onBlur={this.formOnBlur} addonAfter={
                    <Icon type="unlock" theme="outlined" onClick={this.handleModal} className='customIcon'/>
                  }
                  />
                )
              }
            </FormItem>
            <FormItem>
              <LoadingButton
                onBlur={this.formOnBlur} loading={this.state.loading} title="Get the origin url info."/>
            </FormItem>
          </Form>
        </InputBox>
        <PasswordModal show={this.state.showModal}
                       password={this.password}
                       hiddenModal={this.handleModal}
                       setPassword={this.setPassword}
        />
      </div>
    )
  }
}


export const RestoreShortUrl = Form.create()(_RestoreShortUrl);