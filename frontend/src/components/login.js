import { useHistory } from 'react-router-dom';
import LoadingButton from './loading-button';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import env from '../env';
import store from '../storage';

const Login = (props) => {
  const history = useHistory();
  const alert = useAlert();
  let type = 'success';
  const localEmail = store.get('email');
  const [email, setEmail] = useState(!!localEmail ? localEmail : '');
  const [remember, setRemember] = useState(!!localEmail);
  const [password, setPassword] = useState('');
  const [submitLoad, setsubmitLoad] = useState(false);

  async function login() {
    setsubmitLoad(true);
    const data = { email, password };
    const req = await fetch(`${env}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();

    if (res.statusCode !== 200) {
      type = 'error';
    }
    alert.show(res.message, {
      type: type,
    });
    reset();

    store.set('token', res.token);
    store.set('email', email);
    if (res.statusCode === 200) {
      props.setTokenCallback(res.token);
      history.replace('/create-blog');
    }
  }

  function reset() {
    setsubmitLoad(false);
    if (!remember) {
      setEmail('');
      setRemember(false);
    }
    setPassword('');
  }
  return (
    <>
      <form>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" defaultChecked={remember} onClick={() => setRemember(!remember)} />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="form-group">
          {submitLoad === true ? (
            <LoadingButton />
          ) : (
            <button type="submit" className="btn btn-orange btn-block" onClick={login} disabled={email === '' || password === ''}>
              Submit
            </button>
          )}
        </div>

        <p className="forgot-password text-right">
          Forgot{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              history.push('/forgot-password');
            }}
          >
            password?
          </a>
        </p>
      </form>{' '}
    </>
  );
};

export default Login;
