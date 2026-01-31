  'use client';

import Navbar from '@components/ui/navbar';
import { DataTable, TableAction } from '@components/table/DataTable';
import { ColumnDef } from '@tanstack/react-table';

type UserRow = {
  firstName: string;
  lastName: string;
  gender: string;
  mobileNo: string;
  email: string;
  joinDate: string;
  status: string;
};

export default function Dashboard() {
  const columns: ColumnDef<UserRow>[] = [
    { accessorKey: 'firstName', header: 'First Name' },
    { accessorKey: 'gender', header: 'Gender' },
    { accessorKey: 'mobileNo', header: 'Mobile No' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'joinDate', header: 'Join Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const mockData: UserRow[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'MALE',
      mobileNo: '1234567890',
      email: 'john@example.com',
      joinDate: '2023-01-01',
      status: 'ACTIVE',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      gender: 'FEMALE',
      mobileNo: '0987654321',
      email: 'jane@example.com',
      joinDate: '2023-02-01',
      status: 'ACTIVE',
    },
  ];

  const actions: TableAction<UserRow>[] = [
    {
      type: 'view',
      icon: 'eye',
      onClick: (row: UserRow) => {
        console.log('View', row);
      },
    },
    {
      type: 'edit',
      icon: 'edit',
      onClick: (row: UserRow) => {
        console.log('Edit', row);
      },
    },
    {
      type: 'delete',
      icon: 'trash',
      onClick: (row: UserRow) => {
        console.log('Delete', row);
      },
      isDisabled: (row: UserRow) => row.status !== 'ACTIVE',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to the Dashboard
        </h2>

        <DataTable
          columns={columns}
          data={mockData}
          actions={actions}
        />
      </div>
    </div>
  );
}
