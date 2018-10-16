import React, {PureComponent} from 'react';
import {Form, Input, message, Modal} from 'antd';


const FormItem = Form.Item;
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


export class _PasswordModal extends PureComponent {
  handleOk = () => {
    this.props.form.validateFields((err, password) => {
      if (!err) {
        this.props.setPassword(password);
        this.props.hiddenModal();
        message.success('Your change have been saved.');
      }
    })
  };

  handleCancel = () => {
    this.props.hiddenModal();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {show, password} = this.props;
    return (
      <Modal
        title="Short Url Password"
        visible={show}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <FormItem label="password" {...formItemLayout}>
            {
              getFieldDecorator('password', {
                initialValue: password,
                validateTrigger: false
              })(
                <Input type='password' placeholder='input the password'/>
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export const PasswordModal = Form.create()(_PasswordModal);