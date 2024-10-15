import { UserType } from "../types/allType";
import userModel from "../models/user.model";

export const createUser = async (payload: UserType) => {
  return await userModel.create(payload);
}
