import { User } from '../domain/user'
import { Auth } from '@/config/userConst'
import useLogger from '@/utils/useLogger'
import * as userApi from '@/api/userApi'
import { ResponseCode } from '@/config/requestEnum'

const logger = useLogger('userService')

export async function login(loginData) {
  const response = await userApi.login(loginData)
  if (response.code === ResponseCode.SUCCESS_CODE) {
    const user = new User(response.data)
    return user
  }

  logger.error('get user failed:', response)
  return createEmptyUser()
}

export async function logout() {
  await userApi.logout()
}

export function createEmptyUser() {
  const user = User.createEmptyUser()
  return user
}

export function getUserAuthList(user) {
  const role = user.role
  const authArr = Auth[role]
  return authArr
}
