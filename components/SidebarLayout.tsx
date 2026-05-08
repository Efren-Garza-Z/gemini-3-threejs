import Sidebar from "./Sidebar";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-y-auto h-screen w-full mt-14 md:mt-0 relative">
                {children}
            </main>
        </div>
    );
}
