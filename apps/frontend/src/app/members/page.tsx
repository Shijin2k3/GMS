import { MembersList } from '@/features/members/components/MembersList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Members | GMS',
};

const Page = () => {
  return <MembersList />;
};

export default Page;
