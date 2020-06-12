import Cookies from 'js-cookie';

export const isLogged = () => {
    const token = Cookies.get( 'token' );
    return !!(token)

}

export const doLogin = ( token: string ) => {

    if( token ) {
        Cookies.set( 'token', token )
    }

} 

export const doLogout = () => {
    Cookies.remove( 'token' );
}