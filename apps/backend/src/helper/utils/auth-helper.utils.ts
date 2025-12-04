import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (
  plainPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};
