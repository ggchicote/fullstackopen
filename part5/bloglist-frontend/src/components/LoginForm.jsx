import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleUsernameInput = ({ target }) => { setUsername(target.value) }
  const handlePasswordInput = ({ target }) => { setPassword(target.value) }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    handleLogin({
      username,
      password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={handleUsernameInput}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={handlePasswordInput}
        />
      </div>
      <button id='login' type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm