import { toast } from 'sonner';
import LeaveForm from '../components/LeaveForm';

const HrManagerLeavePage = () => {
  return (
    <div className="w-full min-h-screen py-8 px-6 bg-gradient-to-bl from-[#ffffffa4] to-[#ffffffa4]">
      <LeaveForm
        title="Employee"
        apiEndpoint="/hr-manager/submit-leave-application"
        onSuccess={(data) => {
          console.log('Data :', data);
          toast.success('Leave application submitted successfully!');
        }}
        onError={(err) => {
          console.log('Error :', err.response.data.message);
          toast.error(err.response.data.message);
        }}
      />
    </div>
  );
};

export default HrManagerLeavePage;
