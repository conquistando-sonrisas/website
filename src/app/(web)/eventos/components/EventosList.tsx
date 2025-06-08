'use client'

import { Alert, Box, CircularProgress, Container, Grid2, Pagination, PaginationItem, Typography } from "@mui/material";
import { Evento, StrapiPagination } from "../../app";
import Image from "next/image";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import LinkIcon from '@mui/icons-material/Link';
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import qs from 'qs'
import { fetcher } from "@/app/utlis/swr";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


export default function EventosList() {
  const currentParams = useSearchParams();
  const page = parseInt(currentParams.get('page') || '1', 10)
  const [eventos, setEventos] = useState<Evento[]>([])
  const [pagination, setPagination] = useState<StrapiPagination | null>(null)
  const queryParams = qs.stringify({
    pagination: { page, pageSize: 5 },
    populate: ['cover'],
    sort: ['fechaInicio:asc'],
    fields: ['nombre', 'fechaInicio', 'ubicacion', 'descripcion']
  }, {
    encodeValuesOnly: true
  })

  const { data, error, isLoading } = useSWRImmutable(`/eventos?${queryParams}`, fetcher);

  useEffect(() => {
    if (!data) return;

    setEventos(data.data);
    setPagination(data.meta.pagination);
  }, [data])


  if (error) {
    return <Alert severity="error">{(error as Error).message}</Alert>
  }

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      {
        eventos.map((evento) => (
          <EventoListItem key={evento.documentId} evento={evento} />
        ))
      }
      {
        eventos.length > 0 ? (
          <Box display='flex' justifyContent='center'>
            <Pagination
              sx={{ my: 4, mx: 'auto' }}
              count={pagination?.pageCount}
              showFirstButton
              showLastButton
              size='large'
              page={page}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  href={`/eventos?${item.page === 1 ? '' : `page=${item.page}`}`}
                  {...item}
                />
              )} />          </Box>

        ) : (
          <Typography>Por el momento no hay eventos registrados</Typography>
        )
      }
    </>
  )
}


const EventoListItem = ({ evento }: { evento: Evento }) => {
  return (
    <Grid2 container columnSpacing={4} rowSpacing={2} mb={8}>
      <Grid2 size={{ xs: 10, md: 4 }} mx='auto' position='relative' height='300px'>
        <Image
          alt=''
          src={`${process.env.NEXT_PUBLIC_STATIC_CONTENT}${evento.cover.formats.medium.url}`}
          fill
          style={{
            objectFit: 'cover',
            borderRadius: 10
          }} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <Typography fontSize={20} fontWeight={600} color="conquiDarkBlue.dark">{
          evento.fechaInicio
            ? new Date(evento.fechaInicio).toLocaleDateString('es', eventoDateFormatOptions)
            : "Por definir"}</Typography>
        <Typography
          component={Link}
          href={`/eventos/${evento.documentId}`}
          fontSize={32}
          fontWeight={600}
          color='conquiDarkBlue.light'
          sx={{
            textDecoration: 'none',
            ':hover': {
              color: '#4051d4'
            }
          }}
        >{evento.nombre}</Typography>
        {evento.ubicacion && (
          <Typography fontWeight={500} color={grey[800]}>{evento.ubicacion}</Typography>
        )}
        <Typography mt={3}>{evento.descripcion}</Typography>
      </Grid2>
    </Grid2>
  )
}



export const eventoDateFormatOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'long',
  timeZone: 'utc'
};