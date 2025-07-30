/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  User,
  Hash,
  Briefcase,
  Building,
  Calendar,
  Phone,
  Mail,
  MapPin,
  PenTool,
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Zod validation schema for API submission
const apiLeaveSchema = z.object({
  employeeCode: z.string().min(1, 'Employee code is required'),
  fromDate: z.string().min(1, 'From date is required'),
  toDate: z.string().min(1, 'To date is required'),
  leaveReason: z
    .string()
    .min(10, 'Reason must be at least 10 characters')
    .max(500, 'Reason too long'),
});

type ApiLeaveData = z.infer<typeof apiLeaveSchema>;

interface LeaveFormProps {
  title: string;
  apiEndpoint: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

const LeaveForm = ({
  title,
  apiEndpoint,
  onSuccess,
  onError,
}: LeaveFormProps) => {
  // Get user data from localStorage
  const getUserData = () => {
    try {
      const userData =
        localStorage.getItem('user') || localStorage.getItem('hr-manager');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  const user = getUserData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ApiLeaveData>({
    resolver: zodResolver(apiLeaveSchema),
  });

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  // Set employee code from user data on component mount
  useEffect(() => {
    if (user?.['Employee Code']) {
      setValue('employeeCode', user['Employee Code']);
    }
  }, [user, setValue]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ApiLeaveData) =>
      axios.post(`${API_URL}${apiEndpoint}`, data),
    onSuccess: (response) => {
      reset();
      if (onSuccess) onSuccess(response.data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });

  const onSubmit = (data: ApiLeaveData) => {
    console.log('data :', data);

    mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4"
    >
      {/* Vintage Paper-like Card */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-amber-50 border border-amber-200 rounded-lg shadow-lg overflow-hidden"
      >
        {/* Form Title */}
        <div className="border-b border-amber-300 p-4 bg-amber-100">
          <motion.h2
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            className="text-2xl font-serif text-[#4d4d4d] flex items-center gap-2"
          >
            <PenTool className="w-5 h-5" />
            {title} Leave Application
          </motion.h2>
          {user?.Email && (
            <div className="text-sm text-[#4d4d4d] mt-1 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>
                Logged in as: <strong>{user.Email}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Employee Information (Display Only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-lg font-serif text-[#4d4d4d] mb-4 border-b border-amber-200 pb-2">
              Employee Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#4d4d4d] flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Employee Name
                  </span>
                </label>
                <input
                  type="text"
                  value={user?.['Employee Name'] || ''}
                  className="input input-bordered bg-amber-50 border-amber-300 focus:border-[#ed1c24]"
                  readOnly
                />
              </div>

              {/* Employee Code */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#4d4d4d] flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Employee Code
                  </span>
                </label>
                <input
                  type="text"
                  value={user?.['Employee Code'] || ''}
                  className="input input-bordered bg-amber-50 border-amber-300 focus:border-[#ed1c24]"
                  readOnly
                />
                {/* Hidden input for form submission */}
                <input type="hidden" {...register('employeeCode')} />
              </div>

              {/* Designation */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#4d4d4d] flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Designation
                  </span>
                </label>
                <input
                  type="text"
                  value={user?.Designation || ''}
                  className="input input-bordered bg-amber-50 border-amber-300 focus:border-[#ed1c24]"
                  readOnly
                />
              </div>

              {/* Department */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#4d4d4d] flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Department
                  </span>
                </label>
                <input
                  type="text"
                  value={user?.Department || ''}
                  className="input input-bordered bg-amber-50 border-amber-300 focus:border-[#ed1c24]"
                  readOnly
                />
              </div>

              {/* WhatsApp Number */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#4d4d4d] flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    WhatsApp Number
                  </span>
                </label>
                <input
                  type="text"
                  value={user?.['WhatsApp Number'] || ''}
                  className="input input-bordered bg-amber-50 border-amber-300 focus:border-[#ed1c24]"
                  readOnly
                />
              </div>

              {/* Work Location */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#4d4d4d] flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Work Location
                  </span>
                </label>
                <input
                  type="text"
                  value={user?.['Work Location'] || ''}
                  className="input input-bordered bg-amber-50 border-amber-300 focus:border-[#ed1c24]"
                  readOnly
                />
              </div>
            </div>
          </motion.div>

          {/* Leave Dates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-lg font-serif text-[#4d4d4d] mb-4 border-b border-amber-200 pb-2">
              Leave Dates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#4d4d4d] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    From Date
                  </span>
                </label>
                <input
                  type="date"
                  className="input input-bordered bg-amber-50 border-amber-300 focus:border-[#ed1c24]"
                  {...register('fromDate')}
                />
                {errors.fromDate && (
                  <span className="text-xs text-[#ed1c24] mt-1">
                    {errors.fromDate.message}
                  </span>
                )}
              </div>

              {/* To Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#4d4d4d] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    To Date
                  </span>
                </label>
                <input
                  type="date"
                  className="input input-bordered bg-amber-50 border-amber-300 focus:border-[#ed1c24]"
                  {...register('toDate')}
                />
                {errors.toDate && (
                  <span className="text-xs text-[#ed1c24] mt-1">
                    {errors.toDate.message}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Reason for Leave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-lg font-serif text-[#4d4d4d] mb-4 border-b border-amber-200 pb-2">
              Reason for Leave
            </h3>
            <div className="form-control">
              <textarea
                placeholder="Please describe your reason for leave (max 500 characters)"
                className="textarea textarea-bordered h-32 w-full resize-none bg-amber-50 border-amber-300 focus:border-[#ed1c24]"
                {...register('leaveReason')}
              ></textarea>
              {errors.leaveReason && (
                <span className="text-xs text-[#ed1c24] mt-1">
                  {errors.leaveReason.message}
                </span>
              )}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-end"
          >
            <button
              type="submit"
              className="btn bg-[#ed1c24] hover:bg-[#d11920] text-white border-none shadow-md px-8"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Submit Application'
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LeaveForm;
