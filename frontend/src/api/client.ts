const API_BASE_URL = 'http://localhost:8080/api'

export async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(API_BASE_URL + path, options)
  if (!response.ok) {
    throw new Error('Anfrage fehlgeschlagen mit Status ' + response.status)
  }
  return (await response.json()) as T
}

export async function requestWithoutResponseBody(path: string, options: RequestInit): Promise<void> {
  const response = await fetch(API_BASE_URL + path, options)
  if (!response.ok) {
    throw new Error('Anfrage fehlgeschlagen mit Status ' + response.status)
  }
}
