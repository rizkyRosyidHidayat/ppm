export function logout() {
    window.localStorage.removeItem('userdata')
    window.localStorage.removeItem('auth_token');
    const isLoggedOut = window.localStorage.getItem('auth_token')
    return isLoggedOut
}