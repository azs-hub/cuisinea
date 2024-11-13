import { User } from '@/types/User'
import { getFakeUser } from '@/mocks/user.mock'

const user = {
  username: 'John',
  email: 'xyz@g.com',
  password: 'Doe1',
}

export const userLogin = async (username: string, password: string): Promise<User> => {
  try {
    if (username === user.username && password === user.password) {
      return getFakeUser()
    } else {
      throw new Error('Invalid username or password')
    }
  } catch (error) {
    throw new Error('Login failed: ' + error.message)
  }
}

export const userRegister = async (
  username: string,
  // password: string,
  email: string
): Promise<User> => {
  try {
    if (username !== user.username && email !== user.email) {
      return getFakeUser()
    } else {
      throw new Error('Username or email already exist')
    }
  } catch (error) {
    throw new Error('Register failed: ' + error.message)
  }
}
