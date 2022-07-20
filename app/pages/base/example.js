import React, { Component } from 'react'

export default class app extends Component {
  static defaultProps = {
  }

  static propTypes = {
  }

  constructor(props) {
    console.log('test commit')
    super(props)
    this.state = {}
  }

  componentDidMount() { }
  render() {
    return (<div>Center Area </div>)
  }
}
