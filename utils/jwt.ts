import jwt from 'jsonwebtoken';

//const secret = process.env.JWT_SECRET;
const secret = 'bec42df4a545ba829c68528e19c1c6282c0dcc11f0577f4c27b582119d7ba2fd';
// 生成token
export function signToken(id: number, secret: any,) {
  //console.log(secret, id);
  
  if (!secret) throw new Error('Environment variable JWT_SECRET is not defined!');
  return new Promise<string>((resolve, reject) => {
    jwt.sign({ id }, secret, { expiresIn: '1day' }, (err, token) => {
      if (err || !token) return reject(err);
      resolve(token);
    })
  })
}
// 验证token
export function verifyToken(token: string, secret: any) {
  if (!secret) throw new Error('Environment variable JWT_SECRET is not defined!');
  return new Promise<{ id: number }>((resolve, reject) => {
    jwt.verify(token, secret, (err: any, payload: any) => {
      if (err || !payload || !payload) return reject(err);
      resolve(payload as { id: number });
    })
  })
}