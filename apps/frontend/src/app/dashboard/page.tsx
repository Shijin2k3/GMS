import { Dashboard } from '@/features/dashBoard/components/DashBoard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};
const Page = () => {
  return <Dashboard />;
};

export default Page;
