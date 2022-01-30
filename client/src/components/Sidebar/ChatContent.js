import React from "react"
import { Box, Badge, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  badgeBox: {
    marginLeft: "auto",
    marginRight: 30,
  },
	bold: {
		fontWeight: 900,
		fontSize: 13,
	},
}))

const ChatContent = (props) => {
	const { conversation, activeConversation } = props
	const classes = useStyles(conversation)
	const { latestMessageText, otherUser } = conversation

	return (
		<Box className={classes.root}>
			<Box>
				<Typography className={classes.username}>
					{otherUser.username}
				</Typography>
				<Typography
					className={
						activeConversation !== otherUser.username &&
						conversation.unreadCount > 0
							? classes.bold
							: classes.previewText
					}
				>
					{latestMessageText}
				</Typography>
			</Box>
			<Box className={classes.badgeBox}>
				<Badge
					badgeContent={
						activeConversation !== otherUser.username
							? conversation.unreadCount
							: 0
					}
					color='primary'
				/>
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activeConversation: state.activeConversation,
  };
};


export default connect(mapStateToProps, null)(ChatContent);
