import React, { useEffect, Component } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const menu1 = () => (
  /* FIXME: react query 사용 */
  // const { data, isLoading, isFetching, isError, error } = useQuery('get-test', axios.post('http://localhost:1111/mock/usercenter/user/userInfo'),
  //   {
  //     onSuccess: data => {
  //       console.log(data);
  //     },
  //     onError: e => {
  //       console.log(e.message);
  //       debugger;
  //     }
  //   });

  /* FIXME: axios 사용  */
  // useEffect(() => {
  // axios.post('http://localhost:1111/mock/usercenter/user/userInfo')
  //   .then(function (response) {
  //     // handle success
  //     debugger;
  //     console.log(response);
  //   })
  // },[])
  <div>menu2 area </div>
);

// http://localhost:1111/mock/usercenter/login
export default menu1;
