import { pbkdf2, randomBytes } from 'crypto';

export const createSalt = () =>
  new Promise<string>((resolve, reject) => {
    randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  });

export const createHashedPassword = (plainPassword: string) =>
  new Promise<{ password: string; salt: string }>(async (resolve, reject) => {
    const salt = await createSalt();
    pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString('base64'), salt });
    });
  });

export const comparePassword = (plainPassword: string, hashedPassword: string, salt: string) =>
  new Promise<boolean>((resolve, reject) => {
    pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      console.log(key.toString('base64'), '$$$$$$$$', hashedPassword, key.toString('base64') === hashedPassword);
      resolve(key.toString('base64') === hashedPassword);
    });
  });
