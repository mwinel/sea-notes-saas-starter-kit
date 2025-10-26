'use client';

import { useMemo, useId } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { IconCircleCheckFilled, IconLoader } from '@tabler/icons-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DragHandle,
  SortableHeader,
  ActionsCell,
  DraggableRow,
  TableCellViewer,
} from '@/components/notes/shared';
import { NotesToolbar } from '@/components/notes/shared/notes-toolbar';
import { NotesPagination } from '@/components/notes/shared/notes-pagination';
import {
  NotesLoadingState,
  NotesErrorState,
  NotesEmptyState,
} from '@/components/notes/shared/notes-states';
import { NoteTableData } from '@/components/notes/schemas';
import { getCategoryColor } from '@/constants/notes';

const columns: ColumnDef<NoteTableData>[] = [
  {
    id: 'drag',
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    size: 20,
    minSize: 20,
    maxSize: 20,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50,
    minSize: 50,
    maxSize: 50,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableHeader column={column}>Title</SortableHeader>,
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
    enableSorting: true,
    size: 300,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <SortableHeader column={column}>Category</SortableHeader>,
    cell: ({ row }) => {
      const category = row.original.category;
      const colorClasses = getCategoryColor(category);

      return (
        <div className="w-32">
          <Badge variant="outline" className={`px-1.5 font-normal ${colorClasses}`}>
            {category}
          </Badge>
        </div>
      );
    },
    enableSorting: true,
    size: 180,
    minSize: 150,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5 font-normal">
        {row.original.status === 'Done' ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
    ),
    enableSorting: true,
    size: 150,
    minSize: 120,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <SortableHeader column={column}>Created</SortableHeader>,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="text-[13px] text-muted-foreground">
          {date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      );
    },
    enableSorting: true,
    size: 200,
    minSize: 180,
  },
  {
    id: 'actions',
    header: () => null,
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <ActionsCell row={row} />
      </div>
    ),
    size: 60,
    minSize: 60,
    maxSize: 60,
  },
];

interface TableViewProps {
  // Data
  data: NoteTableData[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;

  // State
  rowSelection: Record<string, boolean>;
  columnVisibility: VisibilityState;
  columnFilters: ColumnFiltersState;
  sorting: SortingState;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  selectedCategories: string[];
  selectedStatuses: string[];
  showFavoritesOnly: boolean;
  searchValue: string;

  // Handlers
  onRowSelectionChange: (selection: Record<string, boolean>) => void;
  onColumnVisibilityChange: (visibility: VisibilityState) => void;
  onColumnFiltersChange: (filters: ColumnFiltersState) => void;
  onSortingChange: (sorting: SortingState) => void;
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  onSelectedCategoriesChange: (categories: string[]) => void;
  onSelectedStatusesChange: (statuses: string[]) => void;
  onShowFavoritesOnlyChange: (show: boolean) => void;
  onSearchChange: (value: string | number) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onRefetch: () => void;
  onViewChange: (view: 'table' | 'grid') => void;
}

export function TableView({
  data,
  totalCount,
  isLoading,
  isError,
  isFetching,
  rowSelection,
  columnVisibility,
  columnFilters,
  sorting,
  pagination,
  selectedCategories,
  selectedStatuses,
  showFavoritesOnly,
  searchValue,
  onRowSelectionChange,
  onColumnVisibilityChange,
  onColumnFiltersChange,
  onSortingChange,
  onPaginationChange,
  onSelectedCategoriesChange,
  onSelectedStatusesChange,
  onShowFavoritesOnlyChange,
  onSearchChange,
  onDragEnd,
  onRefetch,
  onViewChange,
}: TableViewProps) {
  const sortableId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data]);

  const table = useReactTable({
    data,
    columns,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: (updaterOrValue) => {
      const newValue =
        typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;
      onRowSelectionChange(newValue);
    },
    onSortingChange: (updaterOrValue) => {
      const newValue =
        typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
      onSortingChange(newValue);
    },
    onColumnFiltersChange: (updaterOrValue) => {
      const newValue =
        typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters) : updaterOrValue;
      onColumnFiltersChange(newValue);
    },
    onColumnVisibilityChange: (updaterOrValue) => {
      const newValue =
        typeof updaterOrValue === 'function' ? updaterOrValue(columnVisibility) : updaterOrValue;
      onColumnVisibilityChange(newValue);
    },
    onPaginationChange: (updaterOrValue) => {
      const newValue =
        typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue;
      onPaginationChange(newValue);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  if (isLoading) {
    return <NotesLoadingState />;
  }

  if (isError) {
    return <NotesErrorState onRefetch={onRefetch} isFetching={isFetching} />;
  }

  if (totalCount === 0 && !searchValue) {
    return <NotesEmptyState />;
  }

  return (
    <div className="w-full flex flex-col justify-start gap-6">
      <NotesToolbar
        searchValue={searchValue}
        selectedCategories={selectedCategories}
        selectedStatuses={selectedStatuses}
        showFavoritesOnly={showFavoritesOnly}
        view="table"
        isFetching={isFetching}
        isLoading={isLoading}
        onSearchChange={onSearchChange}
        onSelectedCategoriesChange={onSelectedCategoriesChange}
        onSelectedStatusesChange={onSelectedStatusesChange}
        onShowFavoritesOnlyChange={onShowFavoritesOnlyChange}
        onViewChange={onViewChange}
      />
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={onDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table className="table-fixed">
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{ width: header.getSize() }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody
                className={`**:data-[slot=table-cell]:first:w-8 transition-opacity duration-200 ${
                  isFetching && !isLoading ? 'opacity-50' : 'opacity-100'
                }`}
              >
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Spinner aria-label="Loading" />
                        <span>Loading notes...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center text-red-500">
                      Error loading notes. Please try again.
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <NotesPagination
          pagination={pagination}
          totalCount={totalCount}
          selectedCount={table.getFilteredSelectedRowModel().rows.length}
          totalRows={table.getFilteredRowModel().rows.length}
          onPaginationChange={onPaginationChange}
          pageSizeOptions={[9, 10, 20, 30, 40, 50]}
        />
      </div>
    </div>
  );
}
