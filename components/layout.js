import Navbar from './navbar';
import cookie from 'js-cookie';

export default function Layout({children}) {

    const isLoggedIn = () => {
        console.log(cookie.get('token'));
        return cookie.get('token');
    }

    return (
        <>
        {
            isLoggedIn() ? 
            <Navbar />
            :
            <></>
        }
        {children}
        </>
    )
}