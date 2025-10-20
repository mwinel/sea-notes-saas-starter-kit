'use client';

import * as React from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  IconExclamationCircleFilled,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLoader,
  IconPlus,
  IconCaretUpDownFilled,
} from '@tabler/icons-react';
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
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { z } from 'zod';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { LoadingState } from '@/components/loading-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CreateNoteDialog } from '@/components/create-note-dialog';
import { DebouncedSearchInput } from '@/components/debounced-search-input';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { MultiSelectFilter } from '@/components/ui/multi-select-filter';
import { NotesApiClient } from '@/lib/api/notes';

const apiClient = new NotesApiClient();

// Available categories for filtering
export const AVAILABLE_CATEGORIES = [
  'Travel',
  'Work',
  'Ideas',
  'Design',
  'Capabilities',
  'Personal',
  'Projects',
  'Meetings',
  'Tasks',
  'Research',
  'Goals',
  'Journal',
  'Books',
  'Learning',
  'Shopping',
  'Health',
] as const;

// Available statuses for filtering
export const AVAILABLE_STATUSES = ['Draft', 'Done'] as const;

export const schema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  content: z.string(),
  category: z.string().nullable(),
  status: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-6 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// Sortable header component
function SortableHeader({ column, children }: { column: any; children: React.ReactNode }) {
  return (
    <div
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="flex items-center cursor-pointer hover:bg-muted"
    >
      {children}
      <IconCaretUpDownFilled className="ml-1 h-3.5 w-3.5 opacity-30" />
    </div>
  );
}

// Category color mapping
function getCategoryColor(category: string | null): string {
  if (!category) return 'text-muted-foreground border-muted-foreground/20';

  const categoryColors: Record<string, string> = {
    Travel: 'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10',
    Work: 'text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/10',
    Ideas: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    Design: 'text-pink-600 dark:text-pink-400 border-pink-500/20 bg-pink-500/10',
    Capabilities: 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10',
    Personal: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
    Projects: 'text-orange-600 dark:text-orange-400 border-orange-500/20 bg-orange-500/10',
    Meetings: 'text-indigo-600 dark:text-indigo-400 border-indigo-500/20 bg-indigo-500/10',
    Tasks: 'text-red-600 dark:text-red-400 border-red-500/20 bg-red-500/10',
    Research: 'text-green-600 dark:text-green-400 border-green-500/20 bg-green-500/10',
    Goals: 'text-yellow-600 dark:text-yellow-400 border-yellow-500/20 bg-yellow-500/10',
    Journal: 'text-lime-600 dark:text-lime-400 border-lime-500/20 bg-lime-500/10',
    Books: 'text-teal-600 dark:text-teal-400 border-teal-500/20 bg-teal-500/10',
    Learning: 'text-violet-600 dark:text-violet-400 border-violet-500/20 bg-violet-500/10',
    Shopping: 'text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/10',
    Health: 'text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-500/10',
  };

  return categoryColors[category] || 'text-muted-foreground border-muted-foreground/20';
}

// Actions cell component for edit/delete
function ActionsCell({ row }: { row: Row<z.infer<typeof schema>> }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="flex items-center justify-end">
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-7"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateNoteDialog
        trigger={<span className="hidden" />}
        mode="edit"
        noteId={row.original.id}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
}

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
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
        <div className="text-sm text-muted-foreground">
          {date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
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
    cell: ({ row }) => <ActionsCell row={row} />,
    size: 60,
    minSize: 60,
    maxSize: 60,
  },
];

export function DataTable() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const {
    data: apiData,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      'notes',
      pagination.pageIndex,
      pagination.pageSize,
      columnFilters,
      sorting,
      selectedCategories,
      selectedStatuses,
    ],
    queryFn: () => {
      const globalFilter = columnFilters.find((filter) => filter.id === 'global');
      return apiClient.getNotes({
        page: pagination.pageIndex + 1, // Backend expects 1-indexed pages
        pageSize: pagination.pageSize,
        search: globalFilter?.value as string,
        sortBy:
          sorting.length > 0 ? `${sorting[0].id}:${sorting[0].desc ? 'desc' : 'asc'}` : undefined,
        categories: selectedCategories.length > 0 ? selectedCategories : undefined,
        statuses: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      });
    },
    placeholderData: (previousData) => previousData,
  });

  const data = React.useMemo(() => apiData?.notes || [], [apiData]);
  const totalCount = apiData?.total || 0;

  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data]);

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
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      // TODO: Implement drag-and-drop reordering with backend API
      console.log('Reordering:', { from: active.id, to: over.id });
    }
  };

  const handleSearchChange = (value: string | number) => {
    setColumnFilters((prev) => {
      const filtered = prev.filter((filter) => filter.id !== 'global');
      if (value) {
        return [...filtered, { id: 'global', value }];
      }
      return filtered;
    });
  };

  const searchValue = columnFilters.find((filter) => filter.id === 'global')?.value || '';

  if (isLoading) {
    return <LoadingState message="Loading notes..." />;
  }

  if (isError) {
    return (
      <ErrorState
        icon={<IconExclamationCircleFilled className="size-10 text-destructive" />}
        title="Oops! Something went wrong"
        titleClassName="text-destructive"
        description="We couldn't load your notes. Please check your connection and try again."
        action={{
          label: 'Try Again',
          onClick: () => refetch(),
          loading: isFetching,
        }}
      />
    );
  }

  if (totalCount === 0 && !searchValue) {
    return (
      <EmptyState
        title="No notes found"
        description="Create your first note to get started."
        action={{
          label: 'Create Note',
        }}
      />
    );
  }

  return (
    <div className="w-full flex flex-col justify-start gap-6">
      <div className="flex items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-2 flex-1">
          <DebouncedSearchInput
            value={searchValue as string}
            onChange={handleSearchChange}
            placeholder="Search notes..."
            debounce={300}
            isLoading={!!searchValue && isFetching && !isLoading}
          />
          <MultiSelectFilter
            options={AVAILABLE_CATEGORIES}
            selectedValues={selectedCategories}
            onSelectedChange={setSelectedCategories}
            buttonLabel="Filter by Category"
            searchPlaceholder="Search categories..."
            emptyMessage="No category found."
          />
          <MultiSelectFilter
            options={AVAILABLE_STATUSES}
            selectedValues={selectedStatuses}
            onSelectedChange={setSelectedStatuses}
            buttonLabel="Filter by Status"
            searchPlaceholder="Search statuses..."
            emptyMessage="No status found."
            showSearch={false}
          />
        </div>
        <CreateNoteDialog
          trigger={
            <Button variant="outline" size="sm">
              <IconPlus />
              <span className="hidden lg:inline">Create Note</span>
            </Button>
          }
          mode="create"
        />
      </div>
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
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
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
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
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 py-2 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile();
  const isTruncated = item.title.length > 30;
  const displayTitle = isTruncated ? item.title.substring(0, 30) + '...' : item.title;

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        {isTruncated ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-foreground w-fit px-0 text-left cursor-pointer font-medium hover:underline underline-offset-4">
                {displayTitle}
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start">
              <p className="max-w-md">{item.title}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <span className="text-foreground w-fit px-0 text-left cursor-pointer font-medium hover:underline underline-offset-4">
            {displayTitle}
          </span>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.title}</DrawerTitle>
          <DrawerDescription>Showing total visitors for the last 6 months</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue={item.title} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={item.category ?? undefined}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">Table of Contents</SelectItem>
                    <SelectItem value="Executive Summary">Executive Summary</SelectItem>
                    <SelectItem value="Technical Approach">Technical Approach</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">Focus Documents</SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status ?? undefined}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
