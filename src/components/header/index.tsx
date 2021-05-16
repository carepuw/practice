import React from 'react'
import { Link } from "react-router-dom";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

import { store, ACTION_LOGOUT, SET_SOCKET } from '../../redux'

import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    white: {
      color: '#ffffff'
    }
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();
  let history = useHistory();
  const { user, socket } = store.getState();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    store.dispatch(ACTION_LOGOUT());
    socket.disconnect();
    store.dispatch(SET_SOCKET(null))
    localStorage.removeItem('1312');
    enqueueSnackbar("Выход из профиля прошел успешно!", { variant: 'success' });
    history.push(`/login`);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to={user ? `/profile/id${user.id}` : '/users'}>
            ВОнлайне
          </Link>
        </Typography>
        {user
          ? <>
            <Typography>
              {user.firstName} {user.lastName}
            </Typography>
            <IconButton aria-label="delete">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon className={classes.white} />
              </Badge>
            </IconButton>
            <IconButton onClick={handleLogout} aria-label="delete">
              <ExitToAppIcon className={classes.white} />
            </IconButton>
          </>
          : <>
            <Link to="/login">
              <Button size="small" color="inherit">Войти</Button>
            </Link>
            <Link to="/registration">
              {/* stepper */}
              <Button size="small" color="inherit">Регистрация</Button>
            </Link>
          </>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header;
