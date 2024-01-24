import Link from 'next/link'
import {
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react'

const Mainnavbar = () => {
    return (
        <div>
            <Navbar fluid rounded>
                <NavbarBrand as={Link} href="https://flowbite-react.com">
                    <img
                        src="/favicon.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite React Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Flowbite React
                    </span>
                </NavbarBrand>
                <NavbarToggle />
                <NavbarCollapse>
                    <NavbarLink href="#" active>
                        Home
                    </NavbarLink>
                    <NavbarLink as={Link} href="#">Login</NavbarLink>
                    <NavbarLink href="#">Signup</NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </div>
    )
}
export default Mainnavbar
