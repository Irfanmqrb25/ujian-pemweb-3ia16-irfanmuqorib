import Link from "next/link"

const Nav = () => {
    return (
        <div className='fixed flex items-center justify-between w-full p-4 shadow-md md:px-10 md:py-6 lg:px-20 lg:py-8 bg-brand'>
            <h1 className='text-xl font-bold text-white md:text-3xl'>Taskify</h1>
            <ul className='flex items-center gap-5 font-medium text-white md:gap-10'>
                <li className="transition-all duration-300 hover:-translate-y-1">
                    <Link href='/'>
                        Home
                    </Link>
                </li>
                <li className="transition-all duration-300 hover:-translate-y-1">
                    <Link href='/task/finished'>
                        Finished
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav