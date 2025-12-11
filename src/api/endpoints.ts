import { get, post } from './http'

// 用户相关
export const getUserInfo = () => get('/api/v1/user/info')

// 学校相关
export const getSchoolInfo = () => get('/api/v1/school/info')

// 登录
export const postSchoolLogin = (data: FormData) => post('/api/v1/school/login', data)
