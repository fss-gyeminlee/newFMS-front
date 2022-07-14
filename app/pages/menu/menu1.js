import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Button, Row, Col, message } from 'antd'
import * as testActions from '../../redux/actions/test'

const menu1 = ({ actions, list }) => {
  const [state, setState] = React.useState({})

  console.log(list)

  const handleButtonClick = () => {
    actions.confirmRequest()
  }
  return (<><Button type="primary" htmlType="submit" className="cert-btn" onClick={handleButtonClick}>clcik시 목록 노출 </Button>{list.length > 0 && list.map(item => <div>{item.name}</div>)}</>)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps')
  return {
    list: state.confirm.list.data,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(testActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(menu1);
