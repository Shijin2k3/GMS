'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { Icon } from '@/components/atoms/Icon/Icon';

export type TableAction<T> = {
  type: 'view' | 'edit' | 'delete';
  icon: 'eye' | 'edit' | 'trash';
  onClick: (row: T) => void;
  isDisabled?: (row: T) => boolean;
};

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actions?: TableAction<TData>[];
};

export function DataTable<TData, TValue>({
  columns,
  data,
  actions,
}: DataTableProps<TData, TValue>) {
  const finalColumns = useMemo<ColumnDef<TData, TValue>[]>(() => {
    if (!actions?.length) return columns;

    return [
      ...columns,
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {actions.map(action => {
              const disabled = action.isDisabled?.(row.original) ?? false;

              return (
                <Button
                  key={action.type}
                  variant="ghost"
                  disabled={disabled}
                  onClick={() => action.onClick(row.original)}
                  className="rounded-full"
                >
                  <Icon icon={action.icon} className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        ),
      },
    ];
  }, [columns, actions]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={finalColumns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

