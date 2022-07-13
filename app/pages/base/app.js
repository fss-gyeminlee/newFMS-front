
import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { message, LocaleProvider } from 'antd'
import { validateTickit/* , parseQueryString */ } from '@configs/common'
import { loginByKey } from '@apis/common'
import enUS from 'antd/lib/locale-provider/en_US'
import '@styles/base.less'

import Header from './app/header'
import LeftNav from './app/leftNav'
// import TabList from './app/tabList'
// import SocketComponent from './socket'

@connect((state, props) => ({}))
export default class App extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      menuStyle: false,
      leftNav: [],
      topMenuReskey: 'platformManage',
      gMenuList: [],
      idRenderChild: false,
      // isHideNav: false,
      isIframe: false,
    }
  }

  componentDidMount() {
    this.init()
  }

  componentWillReceiveProps(nextProps) {

  }

  init() {
    message.config({
      duration: 3,
    })

    if (sessionStorage.getItem('menuStyle') === 'false') {
      this.setState({
        menuStyle: false,
      })
    }
    console.log(sessionStorage.getItem('menuStyle'))
    console.log(sessionStorage.getItem('menuStyle') === 'true')
    if (sessionStorage.getItem('menuStyle') === 'true') {
      this.setState({
        menuStyle: true,
      })
    }
    const { query } = this.props.location
    if (query.ticket) {
      validateTickit(this.props.location, (res) => {
        this.setState({
          idRenderChild: true,
        })
      })
    } else if (query.key) {
      // const params = parseQueryString(window.location.href)
      loginByKey({ }, (res) => {
        sessionStorage.setItem('key', query.key)
        this.setState({
          idRenderChild: true,
        })
      })
    } else {
      this.setState({ gMenuList: JSON.parse(sessionStorage.getItem('gMenuList')) })
      this.getMenuId(JSON.parse(sessionStorage.getItem('gMenuList')), this.props.location.pathname.replace('/', ''))

      const { topMenuReskey } = this.state
      if (topMenuReskey !== sessionStorage.getItem('topMenuReskey')) {
        this.setState({ topMenuReskey: sessionStorage.getItem('topMenuReskey') })
      }
      this.setState({
        idRenderChild: true,
        // menuStyle: false,
      })
    }

    if (query.mode === 'iframe' || query.key) {
      this.setState({
        isIframe: true,
      })
    } else {
      this.setState({
        isIframe: false,
      })
    }
  }

  getMenuId = (nav, pathname) => {
    this.topMenuReskeyFlag = ''
    this.topMenuReskeyChild = []
    this.flag = false
    // console.log(nav)
    if (nav && nav.length > 0) {
      this.compare(nav, pathname)
    }
  }

  compare(children, pathname) {
    children.map((item) => {
      // console.log(item.resKey)
      if (item.resKey.indexOf('platform') > -1) {
        if (!this.flag && (sessionStorage.getItem('topMenuReskey') !== 'set$')) {
          this.topMenuReskeyFlag = item.resKey
          this.topMenuReskeyChild = item.children
        }
      }
      // eslint-disable-next-line
      const _resKey = `${item.resKey.replace(/[\$\.\?\+\^\[\]\(\)\{\}\|\\\/]/g, '\\$&').replace(/\*\*/g, '[\\w|\\W]+').replace(/\*/g, '[^\\/]+')}$`
      if (new RegExp(_resKey).test(pathname)) {
        // console.log(item.id)
        this.flag = true
        sessionStorage.setItem('menuId', item.id)
        // debugger
        sessionStorage.setItem('topMenuReskey', this.topMenuReskeyFlag)
        this.setState({ /* menuId: item.id,  */topMenuReskey: this.topMenuReskeyFlag })
        return null
      } else if (item.children) {
        this.compare(item.children, pathname)
      }
      return null
    })
  }

  changeMenuStyle = (val) => {
    this.setState({
      menuStyle: val,
    }, () => {
      sessionStorage.setItem('menuStyle', val)
    })
  }

  topMenuClick = (item, index) => {
    // console.log(item)
    if (!item.children) {
      message.info('최상위 메뉴에는 하나 이상의 하위 메뉴가 있어야 합니다.')
      return
    }
    // sessionStorage.setItem('leftNav', JSON.stringify(item.children))
    // this.setState({ leftNav: item.children })
    sessionStorage.setItem('topMenuReskey', item.resKey)
    this.setState({ topMenuReskey: item.resKey })
    // if (index === 3) {
    //   this.set = true
    // } else {
    //   this.set = false
    // }

    if (item.resKey === 'controlCenter') {
      let hasIndex = false
      item.children.map((i) => {
        if (i.resKey === 'screen$/default') {
          hasIndex = true
        }
      })
      if (hasIndex) {
        hashHistory.push(item.children[0].resKey)
      } else {
        hashHistory.push('mission$/my$')
      }
    } else if (item.children[0] && item.children[0] && item.children[0].children && item.children[0].children[0]) {
      hashHistory.push(item.children[0].children[0].resKey)
    } else {
      hashHistory.push(item.children[0].resKey)
    }
  }

  render() {
    const { location, children } = this.props
    const {
      gMenuList, idRenderChild, isIframe, topMenuReskey, leftNav, menuStyle,
    } = this.state
    return (
      <LocaleProvider locale={enUS}>
        <div id="container">
          {
            /* socket
            <SocketComponent />
            */
          }
          {
            idRenderChild && !isIframe ? <Header
              gMenuList={gMenuList}
              topMenuClick={this.topMenuClick}
              topMenuReskey={this.state.topMenuReskey}
            /> : null
          }

          <div className={isIframe ? 'boxed isIframe' : 'boxed'}>
            <div className={menuStyle ? 'boxed boxed-mini' : 'boxed'}>
              <div id="content-container" className="content-container">
                <div id="page-content">
                  {idRenderChild ? children : null}
                </div>
              </div>
            </div>
            {
              idRenderChild ?
                <LeftNav
                  location={location}
                  leftNavMode={this.changeMenuStyle}
                  menuStyle={menuStyle}
                  leftNav={leftNav}
                  topMenuReskey={topMenuReskey}
                /> : null
            }
          </div>
        </div>
      </LocaleProvider>
    )
  }
}
