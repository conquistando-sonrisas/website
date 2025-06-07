import axios from 'axios'

function fetcher(endpoint: string) {
  return fetch(`${process.env.NEXT_PUBLIC_CMS_API}${endpoint}`)
    .then(res => res.json());
}

const conquiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONQUI_API,
  timeout: 5_000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const cmsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CMS_API,
  timeout: 3_000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export {
  fetcher,
  conquiApi,
  cmsApi
}