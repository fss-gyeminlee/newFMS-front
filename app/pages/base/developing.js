import React, { Component } from 'react'
import { Progress } from 'antd'

export default class developing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // activeTab: 'pop' ,
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="developing">
        <Progress
          type="circle"
          percent={100}
          format={() => '준비중.....'}
          width={200}
          status="active"
        />
      </div>
    )
  }
}
