import { useState } from 'react';
import env from '../env';
import { useAlert } from 'react-alert';
import LoadingButton from './loading-button';

const ForgotPassword = () => {
  const alert = useAlert();
  const [email, setEmail] = useState('');

  const [submitLoad, setsubmitLoad] = useState(false);

  let type = 'success';

  async function forgotPassword() {
    setsubmitLoad(true);
    const data = { email };
    const req = await fetch(`${env}auth/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    setsubmitLoad(false);
    if (res.statusCode != 200) {
      type = 'error';
    }
    alert.show(res.message, {
      type: type,
    });
    setEmail('');
  }

  return (
    <>
      <form>
        <h3>Forgot Password</h3>
        <div className="form-group">
          <label htmlFor="email">Enter Email address</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
        </div>
        <div className="form-group">
          {submitLoad === true ? (
            <LoadingButton />
          ) : (
            <button type="button" className="btn btn-orange btn-block" onClick={forgotPassword} disabled={email === ''}>
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
