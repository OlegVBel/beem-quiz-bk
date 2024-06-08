import * as bcrypt from 'bcrypt';

export async function hashPassword(passHash: string): Promise<string> {
  return bcrypt.hash(passHash, 12);
}

export async function comparePassword(passHash: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(passHash, hashedPassword);
}
