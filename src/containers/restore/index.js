import React, {Component} from 'react';
import {Form, Input} from 'antd';

import {InputBox} from "../../components/inputBox";
import {shortToLong} from "../../urils/api";
import {successModal, errorModal, LoadingButton} from "../../components/message";
import {formatResult} from "../../urils/format";

const FormItem = Form.Item;


export class _RestoreShortUrl extends Component {
  state = {
    loading: false,
  };

  handleSubmit = (e) => {
    console.log(e);
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
                         onBlur={this.formOnBlur}
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
      </div>
    )
  }
}


export const RestoreShortUrl = Form.create()(_RestoreShortUrl);