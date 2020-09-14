import cookie from 'js-cookie';
import Router from 'next/router';
import Link from 'next/link';

export default function Navbar() {

    const signOut = () => {
        cookie.remove('token');
        Router.push('/login');
    }

    return (
        <nav className="flex items-center justify-end bg-black px-4 py-2" >
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link href='/home' >
                    <a className="text-white mr-6">
                        <span className="font-semibold text-xl tracking-tight hover:text-gray-400">Batidora FC</span>
                    </a>
                </Link>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <Link href='/team'>
                        <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
                            Equipo
                        </a>
                    </Link>
                    <Link href='/'>
                        <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
                            Fixture
                        </a>
                    </Link>
                    <Link href='/'>
                        <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400">
                            Jugadores
                        </a>
                    </Link>
                </div>
            </div>
            <div>
                <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 cursor-pointer lg:mt-0" onClick={() => signOut()}>Salir</a>
            </div>
            {/*<ul >
                <li><Link href='/'><a>Equipo</a></Link></li>
                <li><Link href='/'><a>Sarasa2</a></Link></li>
                <li><Link href='/'><a>Sarasa3</a></Link></li>
                <li><button onClick={() => signOut()}>Salir</button></li>
            </ul>*/}
        </nav>
    );
}
