import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Command, MenuIcon } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';
import { Link } from 'react-router-dom';

export type NavigationSection = {
    title: string
    href: string
}

export default function Navbar() {

    const navigationData: NavigationSection[] = [
        {
            title: 'Home',
            href: '#'
        },
        {
            title: 'Products',
            href: '#'
        },
        {
            title: 'About Us',
            href: '#'
        },
        {
            title: 'Contacts',
            href: '#'
        }
    ]

    return (
        <header className='sticky top-2 z-50 h-16'>
            <div className='mx-auto bg-[#272429]/60 backdrop-blur-sm rounded-full flex max-w-5xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
                {/* Logo */}
                
                <svg width="120" height="38" viewBox="0 0 220 48" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="34"
                        font-family="Inter, Arial, sans-serif"
                        font-size="32"
                        font-weight="600"
                        // fill="#1E40AF">
                        fill="#714f71">
                        Guide<tspan fill="#14B8A6">Dx</tspan>
                    </text>
                </svg>
                {/* <div className="flex">
                    <Command className="size-4 mt-1 mr-2" /> GuideDx
                </div> */}
                {/* <a href='#'>
                </a> */}

                {/* Navigation */}
                <NavigationMenu className='max-md:hidden'>
                    <NavigationMenuList className='flex-wrap justify-start gap-0'>
                        {navigationData.map(navItem => (
                            <NavigationMenuItem key={navItem.title}>
                                <NavigationMenuLink
                                    href={navItem.href}
                                    className='text-muted-foreground hover:text-primary px-3 py-1.5 text-base! font-medium hover:bg-transparent'
                                >
                                    {navItem.title}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Login Button */}
                <Button className='rounded-lg max-md:hidden' asChild>
                    <Link to={"/login"}>Login</Link>
                </Button>

                {/* Navigation for small screens */}
                <div className='flex gap-4 md:hidden'>
                    <Button className='rounded-lg' asChild>
                        <a href='#'>Login</a>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' size='icon'>
                                <MenuIcon />
                                <span className='sr-only'>Menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56' align='end'>
                            {navigationData.map((item, index) => (
                                <DropdownMenuItem key={index}>
                                    <a href={item.href}>{item.title}</a>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}