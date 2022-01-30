import React from "react"
import { Redirect, useHistory } from "react-router-dom"
import { connect } from "react-redux"
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { BsChatDots } from "react-icons/bs"
import { login } from "./store/utils/thunkCreators"
import { styles } from "./styles"

const useStyles = makeStyles(styles)

const Login = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { user, login } = props

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    await login({ username, password })
  }

  if (user.id) {
    return <Redirect to='/home' />
  }

  return (
    <Grid container justify='center' className={classes.container}>
      <Grid item xs={6} md={5} className={classes.welcomeScreenImage}>
        <Grid justify='center' className={classes.welcomeScreen}>
          <Grid className={classes.welcomeScreenContent}>
            <BsChatDots className={classes.icon} />
            <Typography variant='h5' className={classes.text}>
              Converse with anyone with any language
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item justify='center' xs={6} md={7}>
        <Box>
          <Grid container item className={classes.formRow}>
            <Typography>Need to register?</Typography>
            <Button
              className={classes.button}
              variant='outlined'
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </Grid>
          <Grid className={classes.form}>
            <form onSubmit={handleLogin}>
              <Grid>
                <FormControl margin='normal' required>
                  <TextField
                    aria-label='username'
                    label='Username'
                    name='username'
                    type='text'
                    className={classes.input}
                  />
                </FormControl>
              </Grid>
              <FormControl margin='normal' required>
                <TextField
                  label='password'
                  aria-label='password'
                  type='password'
                  name='password'
                  className={classes.input}
                />
              </FormControl>
              <Grid>
                <Box textAlign='center'>
                  <Button
                    color='primary'
                    type='submit'
                    variant='contained'
                    size='large'
                  >
                    Login
                  </Button>
                </Box>
              </Grid>
            </form>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
