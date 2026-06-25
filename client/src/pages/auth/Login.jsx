import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
// import { useLoginMutation } from '../../api/authApi';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      // Mock login for now since backend might not be ready
      // const res = await login(data).unwrap();
      const mockRes = {
        user: { name: 'Demo User', email: data.email, role: 'user' },
        accessToken: 'mock-token'
      };
      
      dispatch(setCredentials(mockRes));
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center py-20 px-4">
      <div className="card w-full max-w-md p-8 glass animate-fade-in">
        <h2 className="text-3xl font-bold mb-2 text-center text-gradient">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-8">Sign in to continue your learning journey</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email Address"
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
            placeholder="you@example.com"
          />
          
          <div className="mb-2">
            <Input
              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
              placeholder="••••••••"
              className="mb-0"
            />
            <div className="text-right mt-1">
              <Link to="/forgot-password" className="text-sm text-accent hover:text-white transition">
                Forgot password?
              </Link>
            </div>
          </div>
          
          <Button type="submit" className="w-full mt-6" /* isLoading={isLoading} */>
            Sign In
          </Button>
        </form>
        
        <p className="text-center mt-6 text-gray-400">
          Don't have an account? <Link to="/register" className="text-primary hover:text-white transition font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
