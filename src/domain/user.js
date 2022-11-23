import { GenderCh, GenderTitle, Role } from '@/config/userConst'
// domain层
export class User {
  constructor({ userId, userName, gender, role }) {
    this.userId = userId
    this.userName = userName
    this.gender = gender
    this.role = role
  }
  static createEmptyUser() {
    const user = new User({
      userId: undefined,
      userName: '',
      gender: undefined,
      genderCh: '',
      genderTitle: '',
      role: 'user',
      roleName: '普通用户',
    })
    return user
  }
  get genderCh() {
    return GenderCh[this.gender || 0]
  }
  get genderTitle() {
    return GenderTitle[this.gender || 0]
  }
  get roleName() {
    return Role[this.role || 'user']
  }
  get isLogin() {
    return this.userId > 0
  }
}
