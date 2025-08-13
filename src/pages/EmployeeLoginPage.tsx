import { motion } from 'framer-motion';
import { Smartphone, User, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

// Define form schema with Zod
const loginSchema = z.object({
  whatsappNumber: z
    .string()
    .min(1, 'WhatsApp number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Please enter a valid WhatsApp number'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Define the API endpoint
const API_URL = import.meta.env.VITE_BACKEND_URL;

const EmployeeLoginPage = () => {
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
      const response = await axios.post(`${API_URL}/employee/login`, loginData);
      return response.data;
    },
    onSuccess: (data): void => {
      console.log('Login successful', data.data);

      localStorage.setItem('user', JSON.stringify(data.data));

      // Show success toast
      toast.success('Login successful! Redirecting to your portal...');

      setTimeout(() => {
        navigate('/employee-leave');
      }, 1000);
      // Handle successful login (redirect, store token, etc.)
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
      className="flex justify-center p-8 bg-gray-50 min-h-screen"
    >
      <div className="w-full max-w-md">
        {/* Header Section */}
        <motion.header
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-[#ed1c24] flex items-center justify-center"
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800">Employee Login</h1>
          </div>
        </motion.header>

        {/* Login Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white shadow-xl rounded-lg"
        >
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* WhatsApp Number Field */}
              <div className="form-control">
                <div className="relative input w-full">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="whatsappNumber"
                    type="tel"
                    placeholder="Enter your WhatsApp number"
                    className={`w-full pl-10 ${
                      errors.whatsappNumber ? 'border-red-500' : ''
                    }`}
                    {...register('whatsappNumber')}
                  />
                </div>
                {errors.whatsappNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.whatsappNumber.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  className="btn w-full bg-[#ed1c24] hover:bg-[#d11920] text-white border-none disabled:opacity-70"
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
            </form>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-sm text-gray-400"
        >
          <p>Presidency Infracon LLP © {new Date().getFullYear()}</p>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default EmployeeLoginPage;
