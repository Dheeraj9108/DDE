import { Outlet } from "react-router-dom"
import { ThemeProvider } from "./components/theam-provider";

const PublicLayout=()=>{
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Outlet/>
        </ThemeProvider>
    )
}

export default PublicLayout;