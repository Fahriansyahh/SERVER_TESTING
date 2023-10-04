import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
function AuthForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState();
  const isLogin = props.authState === STATE_LOGIN;
  const isSignup = props.authState === STATE_SIGNUP;

  if (data) {
    console.log(data.response);
  }
  const renderButtonText = () => {
    const { buttonText } = props;

    if (!buttonText && isLogin) {
      return 'Login';
    }

    if (!buttonText && isSignup) {
      return 'Signup';
    }

    return buttonText;
  };

  const Login = () => {
    const data = { username: username, password: password };
    axios
      .post('http://localhost:4000/Jwt/v1/Auth/Login', data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      })
      .then(response => {
        console.log(response);
        localStorage.setItem('user', username);
        window.location.href = '/';
      })
      .catch(err => {
        console.log(err);
      });
  };

  const Register = () => {
    // Memeriksa apakah username dan password sudah diisi

    const data = { username: username, password: password };
    axios
      .post('http://localhost:4000/Jwt/v1/Auth', data, {
        withCredentials: true,
      })
      .then(response => {
        setData(response);
        console.log(response);
        // Handle sukses registrasi di sini
      })
      .catch(err => {
        console.log(err);
        // Handle kesalahan registrasi di sini
      });
  };
  return (
    <Form>
      <FormGroup>
        <Label for={props.usernameLabel}>{props.usernameLabel}</Label>
        <Input
          type="text"
          placeholder={props.usernameInputProps.placeholder}
          onChange={e => setUsername(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for={props.passwordLabel}>{props.passwordLabel}</Label>
        <Input
          type="password"
          placeholder={props.passwordInputProps.placeholder}
          onChange={e => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          {isSignup ? 'Agree the terms and policy' : 'Remember me'}
        </Label>
      </FormGroup>
      <hr />
      {isSignup ? (
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={() => Register()}
        >
          {renderButtonText()}
        </Button>
      ) : (
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={() => Login()}
        >
          {renderButtonText()}
        </Button>
      )}

      <div className="text-center pt-1">
        <h6>or</h6>
        <h6>
          {isSignup ? (
            <a
              href="#login"
              onClick={() => props.onChangeAuthState(STATE_LOGIN)}
            >
              Login
            </a>
          ) : (
            <a
              href="#signup"
              onClick={() => props.onChangeAuthState(STATE_SIGNUP)}
            >
              Signup
            </a>
          )}
        </h6>
      </div>

      {props.children}
    </Form>
  );
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
  onSubmit: PropTypes.func,
  buttonText: PropTypes.string,
  children: PropTypes.node,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'username',
  usernameInputProps: {
    type: 'text',
    placeholder: 'username',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: null,
  onSubmit: null,
  buttonText: '',
  children: null,
};

export default AuthForm;
