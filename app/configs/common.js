
import { hashHistory } from 'react-router'
import { message } from 'antd'
import { loginByTicket, staff, login as loginApi, getBtns } from '@apis/common'

export function parseQueryString(url) {
  const obj = {}
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')[1]
    const strs = str.split('&')
    strs.map((item, i) => {
      const arr = strs[i].split('=')
      /* eslint-disable */
      obj[arr[0]] = arr[1]
    })
  }
  return obj
}

const _fetchLoginByTicket = async ticket => new Promise((resolve) => {
  loginByTicket({ ticket }, (response) => {
    resolve(response.data)
  }, (response) => {
    const obj = parseQueryString(window.location.href)
    console.log(obj)
    if (obj.ticket || obj.mode) {
      message.info('로그인이 만료되었거나 서비스를 사용할 수 없습니다.')
    } else {
      hashHistory.replace('/login')
    }
  })
})

const _fetchStaff = () => new Promise((resolve) => {
  staff({}, (res) => {
    const { data } = res
    sessionStorage.setItem('userinfo', JSON.stringify(data))
    resolve()
  })
})

/* eslint-disable no-use-before-define */
export const isHasCurrentMenu = (allMenu, pathname) => compare(allMenu, pathname)
/* eslint-enable no-use-before-define */


const _fetchNav = pathname => new Promise((resolve) => {
  // try {
  //   if (JSON.parse(sessionStorage.getItem('menu')).length > 0) {
  //     resolve()
  //     return
  //   }
  // } catch (e) { e }
  nav({}, (response) => {
    const { list } = response.data
    if (list.length === 0) {
      message.info('이 계정에는 메뉴 권한이 없습니다. 관리자에게 문의하세요.')
      hashHistory.replace('/login')
      // this.setState({ loading: false })
      return
    }
    sessionStorage.setItem('menu', JSON.stringify(list))
    // if (pathname !== '/' && !isHasCurrentMenu(list, pathname)) {
    //   if (process.env.NODE_ENV === 'production') {
    //     hashHistory.replace('/')
    //   }
    // }
    resolve()
  })
})

export const validateTickit = async function validateTickit({ query, pathname }, callback) {
  const { ticket } = query
  if (ticket) {
    const loginInfo = await _fetchLoginByTicket(ticket)
    sessionStorage.setItem('token', loginInfo.token)
    // sessionStorage.setItem('isLeftNavMini', false)
  } else {
    /**
     * * 다음 두 가지 경우에만 존재합니다.
     *       * 1. 로그인이 되어 있지 않다면 로그인 페이지에서 로그아웃하여 로그인 작업을 수행하고, 로그인 시 메뉴를 가져와 sessionStorage에 저장한 후 페이지 점프를 수행한다. 직원 정보 요청
     *       * 2. 로그인 후 페이지를 새로고침한 후 이 코드를 실행하면 지난번에 로그인했을 때 메뉴를 가져와서 sessionStorage에 저장한 것이므로 직원 정보만 요청하면 됩니다.
     *       * (FIXME: 인터넷 속도가 느릴 경우 로그인 토큰을 획득한 후 메뉴 데이터가 반환되기 전에 url을 직접 입력하여 페이지에 접속하여 메뉴를 획득할 수 없는 경우가 있을 수 있습니다.)
     */
    // await _fetchStaff()
    // if (typeof callback === 'function')callback()
    /*
    _fetchStaff()
    _fetchNav(callback)
    */
  }

  const _a = _fetchStaff()
  const _b = _fetchNav(pathname)
  await _a
  await _b
  if (typeof callback === 'function') callback()
}
/* -----------------------------------------------------------------------------*/

function compare(children, pathname) {
  for (let i = 0; i < children.length; i += 1) {
    const item = children[i]
    /* eslint-disable no-useless-escape */
    const _resKey = `${item.resKey.replace(/[\$\.\?\+\^\[\]\(\)\{\}\|\\\/]/g, '\\$&').replace(/\*\*/g, '[\\w|\\W]+').replace(/\*/g, '[^\\/]+')}$`
    /* eslint-enable no-useless-escape */
    if (new RegExp(_resKey).test(pathname)) {
      sessionStorage.setItem('menuId', item.id)
      return true
    } else if (item.children) {
      if (compare(item.children, pathname)) return true
    }
  }
  return false
}

export const getMenuId = (navs, pathname) => {
  if (navs && navs.length > 0) {
    compare(navs, pathname)
  }
}
/* -----------------------------------------------------------------------------*/

export const login = (params, success, failure) => {
  loginApi(params, (response) => {
    sessionStorage.setItem('token', response.data.token)
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
    // _fetchNav().then(() => { success() })
    if (typeof success === 'function') success(response)
  }, (response) => {
    if (typeof failure === 'function') failure(response)
  })
}
/* -------------------------------------------------------*/

export const fetchBtns = (component, cb) => {
  getBtns({ id: sessionStorage.getItem('menuId') }, (res) => {
    const result = {}
    res.data.list.map((item) => {
      result[item.resKey] = true
    })
    typeof (cb) === 'function' ? cb(result) : ''
  })
}

/*
* 브라우저에서 url을 입력해서 접근 했을 경우 처리 로직
* */
export const isLogin = (nextState, replaceState) => {
  if (nextState.location.query && nextState.location.query.ticket) { // 如果url自带ticket
    sessionStorage.setItem('token', 'ticket')
  }
  if (nextState.location.query && nextState.location.query.key) { // 如果url自带key
    sessionStorage.setItem('token', 'key')
  }
  const token = sessionStorage.getItem('token')
  if (!token) { // token check
    replaceState('/login')
  }
}


export const createAjaxAction = (createdApi, startAction, endAction) => (request = {}, resolve, reject, config) => (dispatch) => {
  if (startAction) dispatch(startAction({ req: request, res: {} }))
  const _resolve = (response) => {
    if (endAction) dispatch(endAction({ req: request, res: response }))
    if (resolve) resolve(response)
  }
  return createdApi(request, _resolve, reject, config)
}
