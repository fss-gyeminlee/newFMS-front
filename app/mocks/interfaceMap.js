const path = '/mock'

const base = require('./apis/base')

module.exports = {
  [`${path}/usercenter/login`]: base.login,
  [`${path}/usercenter/user/userMenu`]: base.menu,
  [`${path}/usercenter/user/userInfo`]: base.staff,
  [`${path}/usercenter/logout`]: base.logout,
}
