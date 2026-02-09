import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export default function Footer() {
    return (
        <footer className='text-muted-foreground flex items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6 md:max-lg:flex-col'>
            <p className='text-center text-sm text-balance'>
                {`©${new Date().getFullYear()}`}{' '}
                <a href='#' className='text-primary'>
                    shadcn/studio
                </a>
                , Made for better web design
            </p>
            <div className='flex items-center gap-5'>
                <a href='#'>
                    <IconBrandGithub className='size-4' />
                </a>
                <a href='#'>
                    <IconBrandLinkedin className='size-4' />
                </a>
            </div>
        </footer>
    )
}