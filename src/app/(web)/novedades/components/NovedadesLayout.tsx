'use client'

import { CircularProgress, Grid2, Pagination, PaginationItem, Typography } from "@mui/material";
import { MainNovedadCard, NovedadCard, SecondaryNovedadCard } from "./NovedadCards";
import { MetaPagination, Novedad } from "../../app";
import Link from "next/link";
import useSWR from "swr";
import qs from 'qs'
import { fetcher } from "@/app/utlis/swr";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { parseVersionInfo } from "next/dist/server/dev/parse-version-info";
import useSWRImmutable from "swr/immutable";


export default function NovedadesLayout() {
  const params = useSearchParams();
  const page = parseInt(params.get('page') || '1', 10)
  const swr = useNovedades({ page });

  if (swr.isLoading) {
    return (<CircularProgress size={30} />) // use skeleton
  }

  const [first, second, third, ...more] = swr.novedades;

  return (
    <>
      {
        swr.novedades.length > 0 ? (
          <Grid2 container spacing={5}>
            <Grid2 size={12}>
              {
                first && <MainNovedadCard key={first.documentId} novedad={first} />
              }
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              {
                second && <SecondaryNovedadCard key={second.documentId} novedad={second} />}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} >
              {
                third && <SecondaryNovedadCard key={third.documentId} novedad={third} />
              }
            </Grid2>
            {
              more.length > 0 && more.map(novedad => (
                <Grid2 key={novedad.documentId} size={{ xs: 12, md: 4 }} >
                  <NovedadCard novedad={novedad} />
                </Grid2>
              ))
            }
            <Pagination
              sx={{ my: 4, mx: 'auto' }}
              count={swr.pagination?.pageCount}
              showFirstButton
              showLastButton
              size='large'
              page={page}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  href={`/novedades?page=${item.page}`}
                  {...item}
                />
              )} />
          </Grid2>
        ) : (
          <Typography>No hay novedades 😔</Typography>
        )}
    </>
  )
}

const useNovedades = ({ page = 1, pageSize = 6 }: { page?: number, pageSize?: number }) => {
  const queryParams = qs.stringify({
    sort: ['publishedAt:desc'],
    pagination: {
      page,
      pageSize
    },
    fields: ['titulo', 'tipo', 'publishedAt', 'resumen'],
    populate: ['cover', 'createdBy'],
  }, {
    arrayFormat: 'indices',
    encode: false
  })

  const { data, error, isLoading } = useSWRImmutable(`/novedades?${queryParams}`, fetcher)
  const [novedades, setNovedades] = useState<Novedad[]>([])
  const [pagination, setPagination] = useState<MetaPagination | null>(null)

  useEffect(() => {
    if (!data) return;

    setNovedades(data.data);
    setPagination(data.meta.pagination);
  }, [data])

  return {
    novedades,
    error,
    isLoading,
    pagination
  }
}