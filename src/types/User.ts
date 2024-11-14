export interface User {
  id: string
  username: string
  email: string
  password?: string
  token: string
}

export interface FormValues {
  id?: string
  token?: string
  username: string
  email: string
  password: string
  passwordConfirmation: string
}
