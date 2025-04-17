

export function fetcher(endpoint: string) {
  return fetch(`${process.env.NEXT_PUBLIC_CMS_API}${endpoint}`)
    .then(res => res.json());
}