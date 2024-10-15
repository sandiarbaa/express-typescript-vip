import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    name: { type: String, default: '', required: true },
    password: { type: String, default: '', required: true },
    role: { type: String, default: 'user', required: true }
  },
  { timestamps: true }
)

const userModel = mongoose.model('user', userSchema)

export default userModel
