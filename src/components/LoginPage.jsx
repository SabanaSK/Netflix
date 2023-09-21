import { useState ,useRef} from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = () => {
    if (!username || !password)
    {
      setError('Both fields are requried!');
      return;
    }
    if (password.length <= 5) {
      setError("Password should be more than 5 characters!");
      return;
    }
    setError('');
     resetForm('')

  }
  const resetForm = () =>
  {
    setUsername('');
    setPassword('');
    usernameRef.current.focus();
  }
  

  return (
    <div>
      <h1>Login Page</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input 
        ref={usernameRef}
        value={username} 
        onChange={e => setUsername(e.target.value)} 
        placeholder="Username" 
      />
      <input 
        ref={passwordRef}
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleLogin} >Login</button>
      
    </div>
  );
}

export default LoginPage;