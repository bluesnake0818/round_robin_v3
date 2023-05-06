// import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_API_URL}/api/visitors/`

export const create = async (visitor) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        // 'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(visitor),
    })
    return await res.json()
  } catch (error) {
    console.log(error)
    throw error
  }
}
