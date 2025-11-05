import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Login component handles both user login and registration
function Login({ setUsername, setIsLoggedIn }) {
  // State to store form input values
  const [form, setForm] = useState({ email: '', password: '' });
  
  // Toggle between Login and Register mode
  const [isRegister, setIsRegister] = useState(false);
  
  // State to store and display any error messages
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Navigation hook from react-router

  // Handle form submission
  const handleSubmit = async () => {
    setError(''); // Clear previous error

    // Set API URL based on whether the user is registering or logging in
    const url = isRegister
      ? 'http://localhost:8000/api/auth/register'
      : 'http://localhost:8000/api/auth/login';

    try {
      // Send POST request to backend
      const res = await axios.post(url, form);
      console.log('Auth success:', res.data);

      // On success, update user state and localStorage
      setUsername(form.email);
      setIsLoggedIn(true);
      localStorage.setItem('username', form.email);

      // Show a simple success alert
      alert(isRegister ? 'Registered successfully!' : 'Logged in successfully!');
      
      // Redirect user to chat page
      navigate('/chat');
    } catch (err) {
      console.error('Auth failed:', err);
      const msg = err.response?.data?.message || 'Something went wrong';
      setError(msg); // Display error message
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Title changes based on the mode */}
        <h2 style={{ textAlign: 'center' }}>
          {isRegister ? 'Register' : 'Login'}
        </h2>

        {/* Form Fields */}
        <div className="form">
          {/* Email Input */}
          <div className="inputForm">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="inputForm">
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button className="button-submit" onClick={handleSubmit}>
            {isRegister ? 'Register' : 'Login'}
          </button>

          {/* Display error message if exists */}
          {error && (
            <p style={{ color: 'crimson', display: 'flex', alignItems: 'center', gap: '5px' }}>
              {error}
            </p>
          )}

          {/* Toggle between Login and Register mode */}
          <p
            className="span"
            onClick={() => setIsRegister(!isRegister)}
            style={{ textAlign: 'center', cursor: 'pointer' }}
          >
            {isRegister ? 'Already have an account? Login' : 'No account? Register'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
