import React from 'react'
import { Link } from "react-router-dom";

import { store } from '../../redux'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Avatar } from '@material-ui/core';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AlbumIcon from '@material-ui/icons/Album';
import VideocamIcon from '@material-ui/icons/Videocam';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    focusVisible: {
      color: theme.palette.primary.dark,
    },
  }),
);

const Sidebar = (location: string) => {
  const classes = useStyles();
  const { user } = store.getState();
  const render = location != '/login' && user

  return render && (<>
    <div className="container-sidebar">
      <List component="nav" aria-label="main mailbox folders">
        <Link to={`/profile/id${user.id}`}>
          <ListItem button classes={{ root: classes.focusVisible }}>
            <ListItemIcon>
              <HomeRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Профиль" />
          </ListItem>
        </Link>

        <Link to="/users">
          <ListItem button classes={{ root: classes.focusVisible }}>
            <ListItemIcon>
              <SearchIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Пользователи" />
          </ListItem>
        </Link>

        <Link to="/friends/id43124162340912634012">
          <ListItem button classes={{ root: classes.focusVisible }}>
            <ListItemIcon>
              <PeopleAltIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Друзья" />
          </ListItem>
        </Link>

        <Link to="/messages">
          <ListItem button classes={{ root: classes.focusVisible }}>
            <ListItemIcon>
              <EmailRoundedIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <div className="flex flex-align">
                  Сообщения
                <Avatar variant={"circle"} className="dialog-message-image ml-5">1</Avatar>
                </div>
              }
            />
          </ListItem>
        </Link>

        <ListItem button classes={{ root: classes.focusVisible }}>
          <ListItemIcon>
            <AlbumIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Музыка" />
        </ListItem>

        <ListItem button classes={{ root: classes.focusVisible }}>
          <ListItemIcon>
            <VideocamIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Видео" />
        </ListItem>
      </List>

      <Divider />

      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button classes={{ root: classes.focusVisible }}>
          <ListItemIcon>
            <SettingsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Настройки" />
        </ListItem>
      </List>

      <Divider />

      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button classes={{ root: classes.focusVisible }}>
          <ListItemIcon>
            <AppsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Приложения" />
        </ListItem>
      </List>
    </div>
    <Divider orientation="vertical" flexItem />
  </>)
}

export default Sidebar;
