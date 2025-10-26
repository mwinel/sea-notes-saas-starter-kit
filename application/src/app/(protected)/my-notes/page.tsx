import { SiteHeader } from '@/components/navigation/site-header';
import { SidebarInset } from '@/components/ui/sidebar';
import { NotesManager } from '@/components/notes/notes-manager';

export default function Page() {
  return (
    <SidebarInset>
      <SiteHeader title="My Notes" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <NotesManager />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
