import { useState } from 'react';
import { useParams } from 'react-router-dom';
import env from '../env';
import { useAlert } from 'react-alert';
import LoadingButton from './loading-button';

const ResetPassword = () => {
  const alert = useAlert();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitLoad, setsubmitLoad] = useState(false);
  const email = useParams().email;
  console.log(email);

  async function resetPassword() {
    setsubmitLoad(true);
    const data = { password, email };
    let type = 'success';
    const req = await fetch(`${env}auth/reset`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    
    if (res.statusCode != 200) {
      type = 'error';
    }
    alert.show(res.message, {
      type: type,
    });
    reset();
  }

  function reset() {
    setsubmitLoad(false);
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <>
      <form>
        <h4 className="text-orange">Set Password</h4>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="form-group">
          {submitLoad === true ? (
            <LoadingButton />
          ) : (
            <button type="button" className="btn btn-orange btn-block" onClick={resetPassword} disabled={password === '' || confirmPassword === '' || password !== confirmPassword ? true : false}>
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
