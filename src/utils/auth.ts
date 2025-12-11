import Cookies from 'js-cookie'

export function getCookies(key: string): string | undefined {
  return Cookies.get(key)
}

export function setCookies(key: string, value: string, options?: Cookies.CookieAttributes): void {
  Cookies.set(key, value, options)
}

export function removeCookies(key: string): void {
  Cookies.remove(key)
}
