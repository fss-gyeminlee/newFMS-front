import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import { Progress, Button } from 'antd'

export default class notfound extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // activeTab: 'pop' ,
    }
  }

  render() {
    return (
      <div className="developing notfound">
        <Progress
          type="circle"
          percent={100}
          format={() => '404'}
          width={200}
          status="active"
        />

        <div className="link ptbig">
          <p className="mbbig"><Link to="/">go to home</Link></p>
          <p className="mbbig"><Link to="/login">go to login</Link></p>
          <Button type="primary" onClick={() => hashHistory.goBack()}>go to back </Button>
        </div>
      </div>
    )
  }
}
