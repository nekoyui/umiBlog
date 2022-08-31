import { Button, Form, Input, message } from 'antd';
import React ,{useState} from "react";
//import TextInput from "../../components/TextInput";
//import Button from "../../components/Button";
// @ts-ignore
import { history } from "umi";
import './index.css';

const defaultAvatar =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR60r554oHAjTqHisNm1jhq08ZHYZ09jrsb5Qi0e6Y8G0DMWBpa6y9pMizp3Jc8R4eDDJQ&usqp=CAU';
type RegisterData = {
  name: string;
  email: string;
  password: string;
  //remember: boolean;
  avatarUrl?: string;
}
export default function () {
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  //const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  async function onFinish(values: RegisterData) {
    const { name, email, password, avatarUrl = defaultAvatar } = values;
    try {
      setLoading(true);
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name, avatarUrl }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setLoading(false);
      if (res.status === 201) {
        message.success('注册成功');
      }
      else if (res.status === 401) {
        message.error('该邮箱已被注册');
        console.error(await res.text());
        return;
      }
      else {
        console.error(await res.text());
        return;
      }
      const data = await res.json();
      //alert(`欢迎你，${data.name}`);
      history.push('/login');
    } catch (err) {
      console.error(err)
    }
  }

  return <div className="w-full flex justify-center test" >

    <p className="text-3xl font-extrabold">用户注册</p>

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
          { required: true, message: '请输入注册邮箱' },
          { pattern: new RegExp('^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$', 'g'), message: '邮箱格式错误' }
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>

      <Form.Item
        label="用户名"
        name="name"
        rules={[
          { required: true, message: '请输入您的用户名' },
          { max: 12, message: '用户名不得超过12个字符' },
          { pattern: new RegExp('^[0-9a-zA-Z_]{1,}$', 'g'), message: '只允许包含字母，数字，下划线' }
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        label="头像"
        name="avatarUrl"
        rules={[
          { required: false, message: '请输入您的头像链接' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请设置密码' },
        { min: 6, message: '密码不得少于6个字符' },
        { max: 18, message: '密码不得超过18个字符' },
        { pattern: new RegExp('^[a-zA-Z0-9]{5,17}$', 'g'), message: '只允许包含字母，数字，下划线，长度在6~18之间' }
        ]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          注册
        </Button>
      </Form.Item>
    </Form>
  </div>

}

