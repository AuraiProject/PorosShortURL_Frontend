import React, {Component} from 'react';
import {DatePicker, Form, Input, Radio, Modal, message} from 'antd';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 5}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 19}
  }
};


class _CustomForm extends Component {
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.setCustomValues(values);
        this.props.hiddenModal();
        message.success("Your changes have been saved.");
      }
    });
  };

  handleCancel = () => {
    this.props.hiddenModal();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {show, values} = this.props;
    return (
      <Modal
        title="Custom"
        visible={show}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <FormItem label='Specify url path' {...formItemLayout}>
            {
              getFieldDecorator('short_url', {
                rules: [
                  {
                    min: 3, max: 7, message: "Specify url’s length must be 4~7."
                  }
                ],
                initialValue: values['short_url'],
                validateTrigger: false
              })(
                <Input type="text" placeholder='Specify short url.'/>
              )
            }
          </FormItem>
          <FormItem label='Url length' {...formItemLayout}>
            {
              getFieldDecorator('digit', {
                initialValue: values['digit']
              })(
                <RadioGroup defaultvalue={4}>
                  {
                    [3, 4, 5, 6, 7].map(k => <Radio value={k}>{k}</Radio>)
                  }
                </RadioGroup>
              )
            }
          </FormItem>
          <FormItem label='Expired time' {...formItemLayout}>
            {
              getFieldDecorator('expired_timestamp', {
                initialValue: values['expired_timestamp']
              })(
                <DatePicker/>
              )
            }
          </FormItem>
          <FormItem label='Password' {...formItemLayout}>
            {
              getFieldDecorator('password', {
                initialValue: values['password']
              })(
                <Input type='password' placeholder='The password for accessing the short url.'/>
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export const CustomForm = Form.create()(_CustomForm);