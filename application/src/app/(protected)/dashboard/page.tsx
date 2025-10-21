import { SiteHeader } from '@/components/navigation/site-header';
import { SidebarInset } from '@/components/ui/sidebar';

export default function Page() {
  return (
    <SidebarInset>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-1 flex-col gap-4 px-4 py-10">
              <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
              <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
