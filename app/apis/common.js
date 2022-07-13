
import { createApi } from '@ajax'
import { mockURL, /* baseURL, */ path } from '@config'

const prefix = 'usercenter'
const option = { baseURL: mockURL }

export const login = createApi(`${path}/${prefix}/login`, option)
export const logout = createApi(`${path}/${prefix}/logout`, option)
export const loginByTicket = createApi(`${path}/${prefix}/loginByTicket`, option)
export const loginByKey = createApi(`${path}/service/pagerservice/checkKey`, option)
export const staff = createApi(`${path}/${prefix}/user/userInfo`, option)
export const synUser = createApi(`${path}/${prefix}/user/synUser`, option)
export const menu = createApi(`${path}/${prefix}/user/userMenu`, option)
export const getLevel = createApi(`${path}/${prefix}/user/getLevel`, option)
export const getBtns = createApi(`${path}/${prefix}/resource/listByPid`, option)
export const getAllRetrieval = createApi(`${path}/data/sys/retrieval/queryAllRetrievald`)
