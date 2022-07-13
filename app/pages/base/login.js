
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory/* , Link */ } from 'react-router'
import { Spin, Form, Icon, Input, Button, Row, Col, message } from 'antd'
import { regExpConfig } from '@reg'
import { brandName } from '@config'
import { clearGformCache2, login } from '@actions/common'
import { /* login,  */staff, menu } from '@apis/common'
import Logo from '@components/logo/logo'
import md5 from 'md5'
import QueuiAnim from 'rc-queue-anim'

// import '@styles/base.less'
import '@styles/login.less'

const FormItem = Form.Item

@connect((state, props) => ({
  config: state.config,
  loginResponse: state.loginResponse,
}))
@Form.create({
  onFieldsChange(props, items) {},
})

export default class Login extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      isCertificates: false,
      show: true,
    }
  }

  componentDidMount() {
    this.props.dispatch(clearGformCache2({}))
    this.props.form.setFieldsValue({ username: 'gmlee', password: '123456' })
  }

  handleSubmit(e, isCertificates) {
    e.preventDefault()
    if (isCertificates) {
      message.warning('인증서 로그인 기능이 활성화되지 않았습니다.')
      return
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const query = this.props.form.getFieldsValue()
        this.setState({ loading: true })
        /* if (process.env.NODE_ENV === 'production') {
          values.password = values.password
        } else {
          values.password = md5(values.password)
        } */
        values.password = md5(values.password)
        this.props.dispatch(login(values, (res) => {
          sessionStorage.setItem('token', res.data.token)
          sessionStorage.setItem('ticket', res.data.ticket)
          menu({}, (response) => {
            const nav = response.data.list || []
            if (nav && nav[0]) {
              sessionStorage.setItem('gMenuList', JSON.stringify(nav))
              sessionStorage.setItem('topMenuReskey', nav[0].resKey)
              sessionStorage.setItem('leftNav', JSON.stringify(nav))

              staff({ usercode: query.username }, (resp) => {
                sessionStorage.setItem('userinfo', JSON.stringify(resp.data))
                hashHistory.push('/')
              }, (r) => {
                message.warning(r.msg)
                this.setState({
                  loading: false,
                })
              })
            }
          }, (r) => {
            // message.warning(r.msg)
            this.setState({
              loading: false,
            })
          })
        }, (res) => {
          message.warning(res.msg)
          this.setState({
            loading: false,
          })
        }))
      }
    })
  }

  // #endregion
  render() {
    const { getFieldDecorator } = this.props.form
    console.log(this.props.loginResponse)
    return (
      <div className="login-container">
        <div className="extraLink" />
        <div className="flexcolumn">
          <div className="login-header" key="header">
            <div className="slogan">
              <QueuiAnim className="flexcolumn" type={['right', 'left']} key="p">
                {
                  this.state.show ? [
                    <p key="0" className="title">{brandName}
                      {/* <span className="en">BIG DATA</span> */}
                    </p>,
                  ] : null
                }
              </QueuiAnim>
            </div>
            <Logo />
          </div>
          <div className="login-main">
            <QueuiAnim delay={300} type="bottom" key="row">
              {
                this.state.show ? [
                  <Row key="row0">
                    <Col span={8} />
                    <Col span={8}>
                      <Spin spinning={this.state.loading}>
                        <Form onSubmit={e => this.handleSubmit(e, this.state.isCertificates)}>
                          {!this.state.isCertificates ?
                            (<div>
                              <FormItem hasFeedback>
                                {getFieldDecorator('username', {
                                  rules: [
                                    {
                                      required: true, min: 4, max: 10, message: '사용자 이름 4-10자',
                                    },
                                    { pattern: regExpConfig.policeNo, message: '4~10자리 또는 영문' },
                                  ],
                                })(<Input addonBefore={<Icon type="user" />} placeholder="사용자 이름을 입력하십시오" type="text" />)}
                              </FormItem>
                              <FormItem hasFeedback>
                                {getFieldDecorator('password', {
                                  rules: [
                                    {
                                      required: true, min: 6, max: 16, message: '비밀번호는 6~16자입니다.',
                                    },
                                    { pattern: regExpConfig.pwd, message: '비밀번호는 6~16자입니다.' },
                                  ],
                                })(<Input addonBefore={<Icon type="lock" />} placeholder="비밀번호를 입력 해주세요" type="password" />)}
                              </FormItem>
                              <FormItem>
                                <Button type="primary" htmlType="submit" className="cert-btn">ok</Button>
                              </FormItem>
                            </div>) :
                            <FormItem>
                              <Button type="primary" htmlType="submit">submit</Button>
                            </FormItem>
                          }
                        </Form>
                      </Spin>
                    </Col>
                    <Col span={8} />
                  </Row>,
                ] : null
              }
            </QueuiAnim>
          </div>
        </div>
      </div>
    )
  }
}
