import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export default function Footer() {
    return (
        <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
            <p className='text-center font-medium text-balance flex gap-4'>
                {`©${new Date().getFullYear()}`}{' '}
                <a href='#' className='hover:underline'>
                    GuideDx
                </a>
                , Diagnostics made effortless
                <a href='#'>
                    <IconBrandLinkedin className='size-5' />
                </a>
                <a href='#'>
                    <IconBrandGithub className='size-5' />
                </a>
            </p>
        </div>
    )
}