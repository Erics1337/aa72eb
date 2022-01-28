import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, otherUser, lastRead, unreadCount } = props;
  return (
    <Box className={classes.root}>
      {unreadCount > 0 && lastRead &&
      <Avatar alt={otherUser.username} src={otherUser.PhotoUrl} className={classes.avatar}></Avatar>
      }
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {unreadCount === 0 && lastRead &&
      <Avatar alt={otherUser.username} src={otherUser.PhotoUrl} className={classes.avatar}></Avatar>
      }
    </Box>
  );
};

export default SenderBubble;
