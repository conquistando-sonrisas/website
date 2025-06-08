import axios from 'axios'


const conquiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONQUI_API,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const cmsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CMS_API,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
  }
})


async function fetcher(endpoint: string) {
  const res = await cmsApi.get(`${process.env.NEXT_PUBLIC_CMS_API}${endpoint}`);
  return res.data;
}

export {
  fetcher,
  conquiApi,
  cmsApi
}