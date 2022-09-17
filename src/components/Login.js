import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {
  const { dispatch } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reset = () => {
            setEmail('');
            setPassword('');
        }

        setError(null);
        setLoading(true);
        const data = { email, password };

        const response = await fetch('http://localhost:8000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setLoading(false);
        }

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            setError(null);
            reset();
        }
    }

  
  return (
    <div className="container mx-auto rounded-lg p-10 shadow border-2 border-gray-900 mt-5">
      <h1 className="text-gray-900 font-semibold text-4xl text-center ">Log in to your Account</h1>
        <p 
          className="text-gray-500 text-center">
          Don't have an account yet?&nbsp;
          <span>
            <Link to="/signup" 
              className="text-gray-900 font-bold">
              Create one today
            </Link>
          </span>
        </p>
      <form className="form-control" onSubmit={handleSubmit}>
        <div className="mt-2 text-center">
            <div>
                <input 
                  className="rounded-md w-96 h-12 mt-2" 
                  type="text" 
                  placeholder=" Enter Your Email Address"
                  style={{ border: error ? '2px solid red' : '2px solid gray' }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
            </div>

            <div>
                <input 
                  className="rounded-md w-96 h-12 mt-2" 
                  type="password" 
                  placeholder=" Enter Your Secured Password"
                  style={{ border: error ? '2px solid red' : '2px solid gray' }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
            </div>
        </div>
        <div className="mt-3 text-center">
            <button 
              className="px-3 py-3 rounded-full bg-gray-900 text-white w-96"
              disabled={loading}
              >Login
            </button>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
      </form>    
    </div>
  )
}

export default Login;