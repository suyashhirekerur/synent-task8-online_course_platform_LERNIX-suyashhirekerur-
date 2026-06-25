import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Mock registration
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || 'Registration failed');
    }
  };

  const password = watch('password');

  return (
    <div className="container mx-auto flex justify-center items-center py-12 px-4">
      <div className="card w-full max-w-md p-8 glass animate-fade-in">
        <h2 className="text-3xl font-bold mb-2 text-center text-gradient">Create Account</h2>
        <p className="text-gray-400 text-center mb-8">Join thousands of learners today</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Full Name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
            placeholder="John Doe"
          />
          
          <Input
            label="Email Address"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
            })}
            error={errors.email?.message}
            placeholder="you@example.com"
          />
          
          <Input
            label="Password"
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            error={errors.password?.message}
            placeholder="••••••••"
          />

          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', { 
              validate: value => value === password || 'Passwords do not match'
            })}
            error={errors.confirmPassword?.message}
            placeholder="••••••••"
          />
          
          <Button type="submit" className="w-full mt-6">
            Sign Up
          </Button>
        </form>
        
        <p className="text-center mt-6 text-gray-400">
          Already have an account? <Link to="/login" className="text-primary hover:text-white transition font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
