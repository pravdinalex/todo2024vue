import { nanoid } from 'nanoid'

export function isLocalStorageAvailable(): boolean {
  if (!localStorage) {
    return false
  }

  const test = `${nanoid()}-test`

  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch(e) {
    return false
  }
}
