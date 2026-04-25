'use client';

import Navbar from '@/components/ui/navbar';
import { DataTable, TableAction } from '@/components/table/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { useMembers } from '../hooks/useMembers';

type UserRow = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  mobileNo: string;
  email: string;
  joinDate: string;
  status: string;
};

export function MembersList() {
  const { data: members, isLoading } = useMembers();

  const columns: ColumnDef<UserRow>[] = [
    { accessorKey: 'firstName', header: 'First Name' },
    { accessorKey: 'gender', header: 'Gender' },
    { accessorKey: 'mobileNo', header: 'Mobile No' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'joinDate', header: 'Join Date' },
    { accessorKey: 'status', header: 'Status' },
  ];

  const data = (members as any)?.data || [];

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
        <h2 className="text-2xl font-bold mb-4">Members</h2>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading members...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={data} actions={actions} />
        )}
      </div>
    </div>
  );
}
