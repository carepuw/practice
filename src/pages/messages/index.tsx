import React from 'react'
import { Link } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

import { store } from '../../redux'
import { Card, Avatar, CardContent, Typography } from '@material-ui/core';

import '../../styles/pages/profile.scss';
import '../../styles/pages/messages.scss';

function Messages() {
  const { user, socket } = store.getState();
  const { loading, data } = useQuery(GET_DIALOGS, { variables: { id: user.id } });

  return !loading ? (
    <div className="container-page">
      {
        data.getDialogs.map(e => {
          const lastMessage = e.messages[0];
          const sender = e.users[lastMessage.userNum];
          const secondUser = e.users.find(e => e.id != user.id);

          return (
            <Card key={e.id}>
              <CardContent>
                <div className="flex">
                  <div className="profile-post-container">
                    <Link to={`/profile/id${secondUser.id}`}>
                      <Avatar variant={"circle"} className="profile-post-image">
                        {`${secondUser.firstName[0]} ${secondUser.lastName[0]}`}
                      </Avatar>
                    </Link>
                  </div>
                  <div className="f1">
                    <Link to={`/dialog/id${e.id}`}>
                      <Typography color="textSecondary" gutterBottom>
                        {`${secondUser.firstName} ${secondUser.lastName}`}
                      </Typography>
                      <div className="flex">
                        <div className="dialog-message-container">
                          <Avatar variant={"circle"} className="dialog-message-image">
                            {`${sender.firstName[0]} ${sender.lastName[0]}`}
                          </Avatar>
                        </div>
                        <div className="flex flex-align">
                          <Typography>
                            {`${lastMessage.text}`}
                          </Typography>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-align">
                    <Avatar variant={"circle"} className="dialog-message-image">3</Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })
      }
    </div>
  ) : (
    <div className="container-page">
      Загрузка...
    </div>
  )
}

const GET_DIALOGS = gql`
  query GetDialogs($id: String) {
    getDialogs(id: $id) {
      id, 
      users {
        id, firstName, lastName, avatar
      },
      messages {
        id, text, userNum, creationDate
      }
    }
  }
`

export default Messages
