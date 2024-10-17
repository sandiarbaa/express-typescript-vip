import bcrypt from 'bcrypt'

// encode
export const hashing = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

// decode
export const checkPassword = (password:string, userPassword: string): boolean => {
  return bcrypt.compareSync(password, userPassword)
}