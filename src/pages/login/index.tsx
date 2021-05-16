import React from 'react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";

import { store, ACTION_LOGIN, SET_SOCKET } from '../../redux'

import { fText } from '../../components/editors';

import { Button } from '@material-ui/core';
import '../../styles/pages/log-reg.scss'

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();

  const [data, setData] = React.useState({
    email: '',
    password: ''
  })

  const changeData = (e, name) => {
    const newData = { ...data };
    newData[name] = e;
    setData(newData);
  }

  const [login] = useMutation(LOGIN, {
    update(cache, { data: { login } }) {
      const socket = io('http://localhost:4052');
      socket.emit('ONLINE', login.id);
      store.dispatch(SET_SOCKET(socket));
      store.dispatch(ACTION_LOGIN(login));
      localStorage.setItem('1312', JSON.stringify(login));
      enqueueSnackbar("Авторизация прошла успешно!", { variant: 'success' });
      history.push(`/profile/id${login.id}`);
    },
    onError(err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  });

  const onLogin = () => {
    login({ variables: { email: data.email, password: data.password } })
  }

  return (
    <div className="log-reg-container">
      {fText({}, data.email, 'почта', e => changeData(e, 'email'))}
      {fText({}, data.password, 'пароль', e => changeData(e, 'password'))}
      <Button onClick={onLogin} style={{ marginTop: '15px' }} size="small" variant="contained" color="primary">Войти</Button>
    </div>
  )
}

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id, firstName, lastName, birthday, age
    }
  }
`

export default Login
