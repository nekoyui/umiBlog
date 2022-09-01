import React, { useEffect, useState } from 'react';
// @ts-ignore
import { history } from "umi";
import './index.less';
import { Avatar } from 'antd';

const defaultUser = {
  email: '',
  name: '123',
  avatarUrl: ''
}

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>();
  const [curUser, setCurUser] = useState(defaultUser);
  async function refresh() {
    try {
      const res = await fetch('/api/posts');
      if (res.status !== 200) {
        console.error(await res.text());
      }
      setPosts((await res.json())
        .sort((p1: any, p2: any) =>
          new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime()));
    } catch (err) {
      console.error(err)
    }
  }


  async function getCurUserInfo() {
    try {
      const cname:string = "email";
      function getCookie(cname: string) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i].trim();
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
      }
      const email = getCookie(cname);
      console.log(email);

     // debugger;
      console.log(2222);
      
      
      const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    //  debugger;
      console.log(1111);
      
      const user = await res.json()
      console.log(user);
      return user;
    } catch (err) {
      console.error(err);
      return defaultUser;
    }
  }

  useEffect(() => {
    refresh();
    getCurUserInfo().then(
      user => {
        setCurUser(user);
      }
    )
  }, []);

  return (
    <div className="flex flex-row w-full justify-center flex-wrap">
      <div className="nav-bar">
        <Avatar className="avatar" src='https://img2.baidu.com/it/u=390829681,3002818272&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' />
        <div className="uername">1{curUser.name}</div>
      </div>
      {!posts && <div
        className="fixed w-screen h-screen flex justify-center items-center">
        <p className="animate-pulse">Loading...</p>
      </div>}
      {posts && <div className="container flex flex-row w-full justify-center
       flex-wrap p-4 px-2 md:px-24 xl:px-64">
        {posts.map(post => <div
          key={post.id} className="w-full lg:w-1/2 p-4">
          <div
            onClick={() => history.push(`/posts/${post.id}`)}
            className="w-full h-64 bg-white relative transition-all
          rounded-xl overflow-hidden cursor-pointer hover:shadow-xl">
            <img
              src={post.imageUrl}
              alt=""
              className="absolute top-0 w-full h-full" />
            <div
              className="absolute top-0 w-full h-full bg-black opacity-10
              hover:opacity-40 transition-all" />
            <div className="z-50 absolute bottom-0 p-4">
              <p className="text-white font-extrabold">{post.title}</p>
            </div>
          </div>
        </div>)}
      </div>}
    </div>
  );
}
