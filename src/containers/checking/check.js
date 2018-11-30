import React, {Component} from 'react';
import {Form, Input, message} from 'antd';
import {withRouter} from 'react-router-dom'

import {InputBox} from "../../components/inputBox";
import {LoadingButton} from "../../components/message";
import {shortToLong} from "../../urils/api";
import {errorModal} from "../../components/message";

const FormItem = Form.Item;


export class _CheckPassword extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    message.info(
      "You should provide the password to access this short url."
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const value = this.props.form.getFieldValue('password');
    if (!value) {
      return false;
    }

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });

        shortToLong({
          short_url: window.location.origin + '/' + window.location.search.split('=')[1]
        }, values.password).then(async res => {
          let resJson = await res.json();

          if (res.status === 401) {
            message.warn("Password error.")
          } else if (res.status === 200) {
            message.success("Passed validation. Jump to the target site immediately...");
            setTimeout(() => {
              window.location = resJson.url;
            }, 1000);
          } else {
            errorModal(resJson);
          }

          this.setState({
            loading: false
          })
        }).catch(err => console.log(err));
      }
    })
  };

  formOnBlur = () => {
    const value = this.props.form.getFieldValue('password');
    this.props.form.setFields({
      password: {
        value: value,
        errors: null
      }
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <InputBox inputBoxIconClassName="checkPasswordBoxIcon">
        <Form
          onSubmit={this.handleSubmit}
          className='checkPasswordForm'
        >
          <FormItem style={{margin: "10px 0"}}>
            {
              getFieldDecorator('password', {
                rules: [
                  {required: true, message: 'This field is required'},
                ],
                validateTrigger: false
              })(
                <Input placeholder="Please input the password of the short url that you will access"
                       size="large" onBlur={this.formOnBlur}/>
              )
            }
          </FormItem>
          <FormItem>
            <LoadingButton
              onBlur={this.formOnBlur} loading={this.state.loading}
              title="Submit"
            />
          </FormItem>
        </Form>
      </InputBox>
    )
  }
}


export const CheckPassword = Form.create()(withRouter(_CheckPassword));