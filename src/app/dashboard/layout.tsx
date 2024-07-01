import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }:{children: React.ReactNode}) {
    return(
        <div className="bg-background">
            <Navbar />
            <div className="border-t border-border">
                {children}
            </div>
        </div>
    )
}