import React, {PureComponent} from 'react';
import {Form, Input, Icon} from 'antd';

import {InputBox} from "../../components/inputBox";
import {CustomForm} from "./customForm";
import {longToShort} from "../../urils/api";
import {successModal, errorModal, LoadingButton} from "../../components/message";
import {timeToPythonTimestamp, formatResult} from "../../urils/format";

const FormItem = Form.Item;


class _GenerateShortUrl extends PureComponent {
  state = {
    custom: false,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.customValues = {
      short_url: null,
      digit: null,
      expired_timestamp: null,
      password: null
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = this.props.form.getFieldValue('url');
    if (!values) {
      return false;
    }

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const allValues = {...values, ...this.customValues};
        let date = this.customValues.expired_timestamp;
        allValues.expired_timestamp = date && timeToPythonTimestamp(date);
        if (!allValues.url.startsWith('http://') && !allValues.url.startsWith('https://')) {
          allValues.url = 'http://' + allValues.url
        }

        this.setState({
          loading: true
        });
        longToShort(allValues).then(async res => {
          let resJson = await res.json();
          if (res.status === 400) {
            errorModal(resJson);
          } else if (res.status === 200) {
            resJson = formatResult(resJson);
            successModal(resJson);
          }

          this.setState({
            loading: false
          });
        }).catch(err => console.log(err));
      }
    });
  };

  formOnBlur = () => {
    const value = this.props.form.getFieldValue('url');
    this.props.form.setFields({
      url: {
        value: value,
        errors: null
      }
    })
  };

  reverseCustomForm = () => {
    this.setState({
      custom: !this.state.custom
    })
  };

  setCustomValues = (values) => {
    this.customValues = values;
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div>
        <InputBox inputBoxIconClassName="generateInputBoxIcon">
          <Form
            onSubmit={this.handleSubmit}
            className='generateUrlForm'
          >
            <FormItem style={{margin: "10px 0"}}>
              {
                getFieldDecorator('url', {
                  rules: [
                    {required: true, message: 'This field is required.'},
                    {
                      pattern: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
                      message: "This field must be a valid url."
                    }
                  ],
                  validateTrigger: false
                })(
                  <Input placeholder="Input your url." size="large"
                         onBlur={this.formOnBlur} addonAfter={
                    <Icon type="setting" onClick={this.reverseCustomForm} className='customIcon'/>
                  }
                  />
                )
              }
            </FormItem>
            <FormItem>
              <LoadingButton
                onBlur={this.formOnBlur} loading={this.state.loading} title="Get your short url!"/>
            </FormItem>
          </Form>
        </InputBox>
        <CustomForm show={this.state.custom}
                    values={this.customValues}
                    hiddenModal={this.reverseCustomForm}
                    setCustomValues={this.setCustomValues}
        />
      </div>
    )
  }
}

export const GenerateShortUrl = Form.create()(_GenerateShortUrl);