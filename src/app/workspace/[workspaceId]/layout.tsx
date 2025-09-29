"use client";
import { Sidebar } from "./components/sidebar";
import { Toolbar } from "./components/toolbar"

interface WorkspaceIdPageLayoutProps{
    children:React.ReactNode
}
const WorkspaceIdPageLayout = ({children}:WorkspaceIdPageLayoutProps) =>{
    return(
        <div className="h-full overflow-hidden">
            <Toolbar/>
            <div className="flex h-[calc(100vh-40px)]">
             <Sidebar/>
            </div>
            {children}
        </div>
    )
}
export default WorkspaceIdPageLayout