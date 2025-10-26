'use client';

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NotesPaginationProps {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  totalCount: number;
  selectedCount: number;
  totalRows: number;
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  pageSizeOptions?: number[];
}

export function NotesPagination({
  pagination,
  totalCount,
  selectedCount,
  totalRows,
  onPaginationChange,
  pageSizeOptions = [9, 18, 27, 36, 45, 54],
}: NotesPaginationProps) {
  const totalPages = Math.ceil(totalCount / pagination.pageSize);

  return (
    <div className="flex items-center justify-between px-4">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        {selectedCount} of {totalRows} note(s) selected.
      </div>
      <div className="flex w-full items-center gap-8 py-2 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value) => {
              onPaginationChange({ ...pagination, pageSize: Number(value) });
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {pagination.pageIndex + 1} of {totalPages}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPaginationChange({ ...pagination, pageIndex: 0 })}
            disabled={pagination.pageIndex === 0}
          >
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() =>
              onPaginationChange({ ...pagination, pageIndex: pagination.pageIndex - 1 })
            }
            disabled={pagination.pageIndex === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() =>
              onPaginationChange({ ...pagination, pageIndex: pagination.pageIndex + 1 })
            }
            disabled={pagination.pageIndex >= totalPages - 1}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() =>
              onPaginationChange({
                ...pagination,
                pageIndex: totalPages - 1,
              })
            }
            disabled={pagination.pageIndex >= totalPages - 1}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
