import React, { useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import { connect } from "react-redux"
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { BsChatDots } from "react-icons/bs"
import { register } from "./store/utils/thunkCreators"
import { styles } from "./styles"

const useStyles = makeStyles(styles)

const Login = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { user, register } = props
  const [formErrorMessage, setFormErrorMessage] = useState({})

  const handleRegister = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const email = event.target.email.value
    const password = event.target.password.value
    const confirmPassword = event.target.confirmPassword.value

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" })
      return
    }

    await register({ username, email, password })
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
            <Typography>Need to log in?</Typography>
            <Button
              className={classes.button}
              variant='outlined'
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          </Grid>
          <Grid className={classes.form}>
            <form onSubmit={handleRegister}>
              <Grid>
                <Grid>
                  <FormControl>
                    <TextField
                      aria-label='username'
                      label='Username'
                      name='username'
                      type='text'
                      required
                      className={classes.input}
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl>
                    <TextField
                      label='E-mail address'
                      aria-label='e-mail address'
                      type='email'
                      name='email'
                      required
                      className={classes.input}
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
                    <TextField
                      aria-label='password'
                      label='Password'
                      type='password'
                      inputProps={{ minLength: 6 }}
                      name='password'
                      required
                      className={classes.input}
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
                    <TextField
                      label='Confirm Password'
                      aria-label='confirm password'
                      type='password'
                      inputProps={{ minLength: 6 }}
                      name='confirmPassword'
                      required
                      className={classes.input}
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Box textAlign='center'>
                  <Button
                    color='primary'
                    type='submit'
                    variant='contained'
                    size='large'
                  >
                    Create
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
    register: (credentials) => {
      dispatch(register(credentials))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
