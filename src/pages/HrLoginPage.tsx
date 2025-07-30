import { motion } from 'framer-motion';
import { User, Key, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

// Define form schema with Zod
const loginSchema = z.object({
  employeeCode: z.string().min(1, 'Employee code is required'),
  password: z.string().min(5, 'Password must be at least 5 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Define the API endpoint
const API_URL = import.meta.env.VITE_BACKEND_URL;

const HrLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  // React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: async (loginData: LoginFormData) => {
      const response = await axios.post(`${API_URL}/hr/login`, loginData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Login successful', data);

      // Store user data in localStorage
      localStorage.setItem('hr', JSON.stringify(data.data));

      toast.success('Login successful! Redirecting to HR portal...');

      // Redirect to HR dashboard after 1 second
      setTimeout(() => {
        navigate('/hr-panel');
      }, 1000);

      // Reset form after successful submission
      reset();
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.error('Login failed:', error);
      // Handle error (show toast, etc.)
      toast.error(
        error.response?.data?.message || 'Login failed. Please try again.',
      );
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center p-4 bg-gray-50"
    >
      <div className="w-full max-w-md">
        {/* Header Section */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#ed1c24] flex items-center justify-center shadow-lg"
            aria-hidden="true"
          >
            <User className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">HR Portal</h1>
          <p className="text-gray-600">Access your human resources dashboard</p>
        </motion.header>

        {/* Login Form */}
        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white shadow-xl rounded-lg border border-gray-200"
        >
          <div className="p-8">
            <motion.form
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Employee Code Field */}
              <div className="form-control">
                <label className="w-full input">
                  <User className="w-5 h-5 text-gray-400" />
                  <input
                    id="employeeCode"
                    type="text"
                    placeholder="Employee Code"
                    className={` w-full${
                      errors.employeeCode ? 'border-red-500' : ''
                    }`}
                    {...register('employeeCode')}
                  />
                </label>
                {errors.employeeCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.employeeCode.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="w-full input">
                  <Key className="w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className={` w-full${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    {...register('password')}
                  />
                </label>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <button
                  type="submit"
                  className="btn w-full bg-[#ed1c24] hover:bg-[#d11920] text-white border-none shadow-md disabled:opacity-70"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      Login
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </motion.div>
            </motion.form>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-sm text-gray-400"
        >
          <p>
            Restricted access • Presidency Infracon LLP ©{' '}
            {new Date().getFullYear()}
          </p>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default HrLoginPage;
