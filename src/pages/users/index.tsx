import React from 'react'
import { Link } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

import { Card, Avatar, CardContent, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import '../../styles/pages/profile.scss';

function Users() {
  const { loading, data } = useQuery(GET_USER);

  return !loading ? (
    <div className="container-page">
      {
        data.getUsers.map((e, i) => (
          <div key={e.id} className={i != 0 ? "mt-10" : ""}>
            <Card>
              <CardContent>
                <div className="flex">
                  <div className="profile-post-container">
                    <Link to={`/profile/id${e.id}`}>
                      <Avatar variant={"circle"} className="profile-post-image">{`${e.firstName[0]} ${e.lastName[0]}`}</Avatar>
                    </Link>
                  </div>
                  <div className="flex flex-align w-100">
                    <Link to={`/profile/id${e.id}`}>
                      <Typography variant="h5" color="textSecondary" gutterBottom>
                        {`${e.firstName} ${e.lastName}`}
                      </Typography>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))
      }
    </div>
  ) : (
    <div className="container-page">
      <div className="flex mt-10 w-100">
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton className="w-100 ml-5" variant="text" />
      </div>
      <div className="flex mt-10 w-100">
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton className="w-100 ml-5" variant="text" />
      </div>
      <div className="flex mt-10 w-100">
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton className="w-100 ml-5" variant="text" />
      </div>
    </div>
  )
}

const GET_USER = gql`
  query {
    getUsers {
      id, firstName, lastName, avatar
    }
  }
`;

export default Users
