import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from "react-router-dom";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';

import { fText } from '../../components/editors';
import { fBadge } from '../../components/badge'
import { store } from '../../redux'

import { Card, Avatar, CardContent, Typography, CardActions, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import '../../styles/pages/profile.scss';

const Profile: React.FC = () => {
  const [postInput, setPostInput] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { user } = store.getState();
  dayjs.extend(relativeTime);

  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: { id: useParams().profileId }
  });
  const allUsers = useQuery(GET_USERS);

  const [createPost] = useMutation(CREATE_POST, {
    update() {
      refetch();
      setPostInput('');
      enqueueSnackbar("Запись успешно опубликована", { variant: 'success' });
    }
  });

  const handleOnCreatePost = () => {
    if (postInput.trim().length > 0) {
      createPost({
        variables: {
          text: postInput,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          profileId: data.getUser.id,
          userId: user.id
        }
      })
    } else {
      enqueueSnackbar("Публиковать пустые записи - нельзя)", { variant: 'info' });
    }
  }

  return !loading && !allUsers.loading ? (
    <div className="container-page">
      <Card>
        <CardContent>
          <div className="flex">
            <div className="profile-image-container">
              <Avatar variant={"circle"} className="profile-image">{`${data.getUser.firstName[0]} ${data.getUser.lastName[0]}`}</Avatar>
            </div>
            <div className="f1">
              <Typography className="f1 flex" variant="h5" color="textSecondary" gutterBottom>
                <div className="f1">
                  {`${data.getUser.firstName} ${data.getUser.lastName}`}
                </div>
                {(data.getUser.online || (user && user.id == data.getUser.id)) ? 'онлайн' : 'офлайн'}
              </Typography>
              <Typography gutterBottom>
                {`Дата рождения: ${data.getUser.birthday}`}
              </Typography>
              <Typography gutterBottom>
                {`Возраст: ${data.getUser.age}`}
              </Typography>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <div className="profile-under-container">
            <div className="profile-friends">
              <Typography color="textSecondary">
                Друзья:
              </Typography>
              <AvatarGroup max={7}>
                <Avatar alt="Remy Sharp">И Г</Avatar>
                <Avatar alt="Travis Howard">Я Б</Avatar>
                <Avatar alt="Cindy Baker">М О</Avatar>
                <Avatar alt="Agnes Walker">А Щ</Avatar>
                <Avatar alt="Agnes Walker">А Г</Avatar>
                <Avatar alt="Agnes Walker">А Г</Avatar>
                <Avatar alt="Agnes Walker">А Г</Avatar>
              </AvatarGroup>
            </div>
            <div className="profile-subscribers">
              <Typography color="textSecondary">
                Подписчики:
              </Typography>
              <AvatarGroup max={7}>
                <Avatar alt="Remy Sharp">И Г</Avatar>
                <Avatar alt="Travis Howard">Я Б</Avatar>
                <Avatar alt="Cindy Baker">М О</Avatar>
                <Avatar alt="Agnes Walker">А Г</Avatar>
                <Avatar alt="Agnes Walker">А Г</Avatar>
                <Avatar alt="Agnes Walker">А Г</Avatar>
                <Avatar alt="Agnes Walker">А Г</Avatar>
                <Avatar alt="Agnes Walker">А Г</Avatar>
                <Avatar alt="Agnes Walker">А Г</Avatar>
              </AvatarGroup>
            </div>
          </div>
        </CardActions>
      </Card>

      {user &&
        <div className="mt-10">
          <Card>
            <CardContent>
              <div>Сделать запись:</div>
              <div>{fText({ multiline: true, variant: 'outlined', style: { width: '100%' } }, postInput, null, (e) => setPostInput(e))}</div>
              <Button onClick={handleOnCreatePost} style={{ float: 'right', margin: '5px 0 10px 0' }} size="small" variant="contained" color="primary">
                Опубликовать
              </Button>
            </CardContent>
          </Card>
        </div>
      }

      {data.getUser.profilePosts.map(e => {
        const sender = allUsers.data.getUsers.find(u => u.id == e.userId);
        return (
          <div key={e.id} className="mt-10">
            <Card>
              <CardContent>
                <div className="flex">
                  <div className="profile-post-container">
                    <Link to={`/profile/id${e.userId}`}>
                      {fBadge(e, (user && e.userId == user.id) || sender.online)}
                    </Link>
                  </div>
                  <div className="w-100">
                    <Link to={`/profile/id${e.userId}`}>
                      <Typography variant="h5" color="textSecondary" gutterBottom>
                        {`${e.firstName} ${e.lastName}`}
                      </Typography>
                    </Link>
                    <Typography>
                      {e.text}
                    </Typography>
                    <div className="flex flex-right flex-align">
                      <Typography>
                        {dayjs(e.creationDate).fromNow()}
                      </Typography>
                      <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                        label="Нравится"
                        style={{ marginLeft: '5px', float: 'right' }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  ) : (
    <div className="container-page">
      Загрузка...
    </div>
  )
}

const GET_USER = gql`
  query GetUser($id: String) {
    getUser(id: $id) {
      id, firstName, lastName, birthday, age, online, profilePosts {
        id, firstName, lastName, text, creationDate, avatar, profileId, userId
      }
    }
  }
`;

const GET_USERS = gql`
  query {
    getUsers {
      id, online
    }
  }
`;

const CREATE_POST = gql`
  mutation CreateProfilePost($lastName: String, $profileId: String, $firstName: String, $text: String, $avatar: String, $userId: String) {
    createProfilePost(firstName: $firstName, profileId: $profileId, lastName: $lastName, text: $text, avatar: $avatar, userId: $userId) { 
      id
    }
  }
`;

export default Profile
