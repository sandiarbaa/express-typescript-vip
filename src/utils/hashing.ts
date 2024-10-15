import bcrypt from 'bcrypt'

// encode
export const hashing = (password: string): string => {
  return bcrypt.hashSync(password, 10)
} 