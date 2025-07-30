import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    

    alert("Login successful!");
    navigate('/'); 
  };

  return (
    <form onSubmit={handleLogin}>
      {/* your form elements here */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
