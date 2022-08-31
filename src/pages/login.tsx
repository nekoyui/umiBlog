import React, { useState } from "react";
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
//import TextInput from "../components/TextInput";
//import Button from "../components/Button";
// @ts-ignore
import { history } from "umi";
type LoginData = {
  email: string;
  password: string;
}
export default function () {

  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  async function onFinish(values: LoginData) {
    const { email, password } = values;
    try {
      setLoading(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setLoading(false);
      switch (res.status) {
        case 200:
          message.success('登录成功');
          break;
        case 401:
          message.error('邮箱或密码错误');
          console.error(await res.text());
          return;
          break;
        default:
          message.error(res.text());
          console.error(await res.text());
          return;
      }
      // if (res.status == 200) {
      //   message.success('登录成功');
      // }
      // if (res.status == 401) {
      //   message.error('邮箱或密码错误');
      //   console.error(await res.text());
      //   return;
      // }
      // else {
      //   message.error(res.text());
      //   console.error(await res.text());
      //   return;
      // }
      const data = await res.json();
      //alert(`欢迎回来，${data.name}`);
      history.push('/posts/create');
    } catch (err) {
      console.error(err)
    }
  }

  return <div className="w-full flex justify-center">
    <div className="container lg:px-64 px-8 pt-16">
      <p className="text-3xl font-extrabold">用户登入</p>
      <div className="mt-8">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          //onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { pattern: new RegExp('^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$', 'g'), message: '邮箱格式错误' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </div>
}

