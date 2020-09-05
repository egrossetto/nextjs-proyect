import cookie from 'js-cookie';

export default function Index() {

    const isLoggedIn = () => {
        return cookie.get('token');
    }

	return (
		<div>
			asdsad
		</div>
	);
}
