
import { AppConfig } from './../config/config';
import * as jwt from 'jsonwebtoken';
import { fetchProfileByEmail } from '../components/authComponent';



// Token Secret
const tokenSecret: any = AppConfig.tokenSecret;

export const AuthenticateUserToken = async (req: any, res: any, next: any) => {
  if (req.header('Authorization')) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send({ status: 'error', message: 'Access Denied' });
    try {
      const verified: any = jwt.verify(token, tokenSecret);

   
      let userdata = await fetchProfileByEmail(verified.email);
      req.user = userdata;
      next();
    } catch (error) {
      res.status(401).send({ status: 'error', message: 'You are not authorized' });
    }
  } else {
    return res.status(401).send({ status: 'error', message: 'You do not have access to this api' });
  }
};

