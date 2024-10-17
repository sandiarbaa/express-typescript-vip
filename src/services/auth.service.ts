import { UserType } from '../types/allType'
import userModel from '../models/user.model'

export const createUser = async (payload: UserType): Promise<UserType> => {
  return await userModel.create(payload)
}

export const findUserByEmail = async (email: string): Promise<UserType | null> => {
  return await userModel.findOne({ email })
}
