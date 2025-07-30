/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  User,
  Briefcase,
  Building,
  Calendar,
  Phone,
  MapPin,
  Mail,
} from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const PartnerPanelPage = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const getPartnerData = () => {
    try {
      const partnerData = localStorage.getItem('partner');
      return partnerData ? JSON.parse(partnerData) : null;
    } catch (error) {
      console.error('Error parsing partner data:', error);
      return null;
    }
  };

  const partner = getPartnerData();

  // Fetch pending leaves
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['partner-get-pending-leaves'],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}/partner/get-pending-leaves?employeeCode=${partner['Employee Code']}`,
      );
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for changing leave status
  const statusMutation = useMutation({
    mutationFn: async ({
      leaveId,
      status,
    }: {
      leaveId: string;
      status: string;
    }) => {
      const response = await axios.put(
        `${API_URL}/partner/change-leave-application-status`,
        { leaveId, status },
      );
      return response.data;
    },
    onSuccess: () => {
      refetch(); // Refresh the list after status change
      toast.success('Leave status updated successfully!');
    },
    onError: (error: any) => {
      console.error('Error updating leave status:', error);
      toast.error(
        error?.response?.data?.message || 'Failed to update leave status',
      );
    },
  });

  const toggleExpand = (leaveId: string) => {
    setExpandedCard(expandedCard === leaveId ? null : leaveId);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold text-[#ed1c24] mb-4">
        Partner Portal
      </h1>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Leave Applications
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner text-[#ed1c24]"></div>
        </div>
      ) : error ? (
        <div className="text-red-600">Error loading leave applications</div>
      ) : data.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No leave applications found
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((leave: any) => (
            <motion.div
              key={leave['Leave ID']}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(leave['Leave ID'])}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {leave['Employee Name']}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        leave.Status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : leave.Status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {leave.Status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {leave.Department} • {leave.Designation}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">{leave['Submission Date']}</div>
                  {expandedCard === leave['Leave ID'] ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>

              {expandedCard === leave['Leave ID'] && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{leave['Employee Name']}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <span>{leave.Designation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span>{leave.Department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{leave['WhatsApp Number']}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{leave.Email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{leave['Work Location']}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Leave Dates:</span>
                      <span>
                        {leave['From Date']} to {leave['To Date']}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium">Reason:</p>
                      <p className="text-gray-700 mt-1">
                        {leave['Leave Reason']}
                      </p>
                    </div>
                  </div>

                  {leave.Status === 'Pending' && (
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        onClick={() =>
                          statusMutation.mutate({
                            leaveId: leave['Leave ID'],
                            status: 'Rejected',
                          })
                        }
                        className="btn bg-red-500 hover:bg-red-600 text-white"
                        disabled={statusMutation.isPending}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          statusMutation.mutate({
                            leaveId: leave['Leave ID'],
                            status: 'Approved',
                          })
                        }
                        className="btn bg-green-500 hover:bg-green-600 text-white"
                        disabled={statusMutation.isPending}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerPanelPage;
