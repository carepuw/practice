import React from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

import { store } from '../../redux'
import { Avatar, Button } from '@material-ui/core';

import '../../styles/pages/dialog.scss'
import { fText } from '../../components/editors';

function Dialog() {
  const [messageInput, setMessageInput] = React.useState('');
  dayjs.extend(relativeTime);
  const dialogId = useParams().dialogId;
  const scrollBottom = React.useRef();
  const { user, socket } = store.getState();
  const [mes, setMes] = React.useState(null);

  const { loading, data } = useQuery(GET_DIALOG, { variables: { id: dialogId } });

  React.useEffect(() => {
    socket.emit('JOIN_DIALOG', dialogId);
    socket.on('NEW_MESSAGE', data => {
      setMes(data.messages);
    })
    if (scrollBottom.current) {
      scrollBottom.current.scrollIntoView(false)
    }
  }, [])

  const handleSendMes = () => {
    if (messageInput.trim().length > 0) {
      socket.emit('MESSAGE', {
        text: messageInput,
        dialogId,
        userNum: data.getDialog.users.findIndex(e => e.id == user.id)
      })
      setMessageInput('');
    }
  }

  return !loading && (
    <div className="container-page">
      <div className="container-messages">
        {
          (mes || data.getDialog.messages).map(e => {
            const sender = data.getDialog.users[e.userNum];
            return (
              <div key={e.id} className="message-card">
                <div className="flex flex-align">
                  <Link to={`/profile/id${sender.id}`}>
                    <Avatar variant={"circle"} className="dialog-message-image">
                      {`${sender.firstName[0]} ${sender.lastName[0]}`}
                    </Avatar>
                  </Link>
                </div>
                <div className="ml-10 w-100">
                  <div className="flex">
                    <Link className="f1" to={`/profile/id${sender.id}`}>
                      {sender.firstName}
                    </Link>
                    {dayjs(e.creationDate).fromNow()}
                  </div>
                  <div className="message-card-text">{e.text}</div>
                </div>
              </div>
            )
          })
        }
        <div ref={scrollBottom}></div>
      </div>
      <div className="send-mes">
        {fText({ multiline: true, variant: 'outlined', style: { width: '100%' } }, messageInput, null, (e) => setMessageInput(e))}
        <Button onClick={handleSendMes} size="small" variant="contained" color="primary">
          Отправить
        </Button>
      </div>
    </div>
  )
}

const GET_DIALOG = gql`
  query GetDialog($id: String) {
    getDialog(id: $id) {
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


export default Dialog
