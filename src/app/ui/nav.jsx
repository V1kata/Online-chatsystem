import { Link } from 'next/link';

export function Nav() {
    return (
        <nav>
            <div className="">
                <Link href='/login'>Login</Link>
            </div>
        </nav>
    )
}