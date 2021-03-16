import { useState } from 'react';
import env from '../env';
import { useAlert } from 'react-alert';
import LoadingButton from './loading-button';

const SignUp = () => {
  const alert = useAlert();
  const [addLoad, setAddLoad] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let type = 'success';

  async function addUser() {
    setAddLoad(true);
    const data = { email, password, name };
    const req = await fetch(`${env}auth/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    setAddLoad(false);
    if (res.statusCode != 200) {
      type = 'error';
    }
    alert.show(res.message, {
      type: type,
    });
    reset();
  }

  function reset() {
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <form>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" id="newEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {addLoad === true ? (
          <LoadingButton />
        ) : (
          <button type="button" className="btn btn-orange btn-block" onClick={addUser} disabled={email === '' || password === '' || name === ''}>
            Sign Up
          </button>
        )}
      </form>
    </>
  );
};

export default SignUp;
