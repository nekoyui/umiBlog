import { Button, Form, Input } from 'antd';
import React from "react";
//import TextInput from "../../components/TextInput";
//import Button from "../../components/Button";
// @ts-ignore
import { history } from "umi";
import './index.css';

const defaultAvatar =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR60r554oHAjTqHisNm1jhq08ZHYZ09jrsb5Qi0e6Y8G0DMWBpa6y9pMizp3Jc8R4eDDJQ&usqp=CAU';
type registerData = {
    name: string;
    email: string;
    password: string;
    remember: boolean;
    avatarUrl?: string;
  }
export default function () {
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  //const [name, setName] = useState("");

  async function onFinish(values: registerData) {
    const {name, email, password, avatarUrl = defaultAvatar} = values;
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name, avatarUrl }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status !== 201) {

        console.error(await res.text());
        return;
      }
      const data = await res.json();
      alert(`欢迎你，${data.name}`);
      history.push('/login');
    } catch (err) {
      console.error(err)
    }
  }

  return <div className="w-full flex justify-center test" >
    <div className="container lg:px-64 px-8 pt-16">
      <p className="text-3xl font-extrabold">用户注册</p>
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
          { required: true, message: 'Please input your username!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="用户名"
        name="name"
        rules={[
          { required: true, message: 'Please input your username!' },
          {}
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="头像"
        name="avatarUrl"
        rules={[
          { required: false, message: 'Please input your username!' },
          {}
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
  </div>
}

