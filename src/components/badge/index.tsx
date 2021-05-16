import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { Badge, Avatar } from '@material-ui/core';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';

const StyledBadgeOnline = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: -1,
        left: -1,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);
const StyledBadgeOffline = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#9c9c9c',
      color: '#9c9c9c',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: -1,
        left: -1,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid currentColor',
        content: '""',
      },
    }
  }),
)(Badge);

export const fBadge = (e, On) => {
  return On ? (
    <StyledBadgeOnline
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
    >
      <Avatar variant={"circle"} className="profile-post-image">{`${e.firstName[0]} ${e.lastName[0]}`}</Avatar>
    </StyledBadgeOnline>
  ) : (
    <StyledBadgeOffline
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
    >
      <Avatar variant={"circle"} className="profile-post-image">{`${e.firstName[0]} ${e.lastName[0]}`}</Avatar>
    </StyledBadgeOffline>
  )
}
