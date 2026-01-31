import Dashboard from "@components/dashboard/DashBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
};
const Page = () => {
  return <Dashboard />;
};

export default Page;
