import image1 from '../../assets/images/image3.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { apiLogin } from '../../services/auth';



const AgentSignIn = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await apiLogin({ email, password });
      if (response.status === 200) {
        // Save the user's token, role, and other data in localStorage
        localStorage.setItem('token', response.data.accessToken);
       

        // Redirect the user to the appropriate dashboard based on their role
        navigate('/departmentdashboard'); 
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Log in
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link to="/deptSignin" className="text-green-500 hover:underline">
              Sign up
            </Link>
          </p> 
        </div>

        <div className="hidden md:block w-1/2 p-6">
          <img src={image1} alt="Login" className="w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default AgentSignIn;
