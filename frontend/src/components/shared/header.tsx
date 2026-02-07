import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../ui/sidebar";
import { BreadcrumbComponent } from "./breadcrumb";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileDropdown from "./profile-dropdown";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "../theam-provider";

export function Header(props: any) {
  const { theme, setTheme } = useTheme();

  const toogleTheme=()=>{
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    // <header className='sticky top-2 z-50 '>
    <header className='sticky top-0 z-50 border-b'>
      {/* <div className='mx-auto bg-[#272429]/60 backdrop-blur-sm rounded-full flex max-w-6xl items-center justify-between gap-6 px-4 py-2 sm:px-6'> */}
      <div className='mx-auto bg-[#272429]/60 backdrop-blur-sm flex items-center justify-between gap-6 px-4 py-2 sm:px-6'>
        <div className='flex items-center gap-4'>
          <SidebarTrigger className='[&_svg]:!size-5' />
          <Separator orientation='vertical' className='hidden sm:block h-4 w-px bg-gray-600/25' />
          <BreadcrumbComponent data={props.breadcrumbs} />
        </div>
        <div className='flex items-center gap-1.5'>
          
          <div className="border p-2.5 rounded-lg" onClick={toogleTheme}>
            {theme === 'light' ? <Sun size={15}/> : <Moon size={15}/>}
          </div>
          <div className="border p-2.5 rounded-lg">
            <Search size={15}/>
          </div>
          <ProfileDropdown
            trigger={
              <Button variant='ghost' size='icon' className='size-8.5 rounded-full outline-none'>
                <Avatar className='size-8.5'>
                  <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
}
