import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';


const scryptAsync = promisify(scrypt);

export const password = {
  async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  },

  async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  },
}


interface GenTokenParams{
  id: Types.ObjectId;
  admin: boolean;
}

export const token = {
  gen(params : GenTokenParams) {
    return jwt.sign({
      id: params.id,
      admin: params.admin,
      exp: Math.floor(Date.now() * 0.001) + 3600,
    }, process.env.JWT_KEY!);
  },

  newRefreshToken() {
    return randomBytes(192).toString('base64');
  }
}
