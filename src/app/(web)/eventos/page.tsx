import { Typography } from "@mui/material";
import Hero from "../components/Hero";
import { Evento, StrapiPaginatedResponse } from "../app";
import EventosList from "./components/EventosList";
import qs from 'qs';


export default async function EventosPage() {
  const queryParams = qs.stringify({
    populate: ['cover'],
    sort: ['fechaInicio:asc'],
    fields: ['nombre', 'fechaInicio', 'ubicacion', 'descripcion']
  }, {
    encodeValuesOnly: true
  }) 
  const eventosReq = await fetch(`${process.env.NEXT_PUBLIC_CMS_API}/eventos?${queryParams}`);
  const eventosRes = await eventosReq.json() as StrapiPaginatedResponse<Evento>;

  return (
    <main style={{ minHeight: '100vh' }}>
      <Hero
        title="Eventos"
        desc="Descubre cuales son nuestros próximos eventos y cómo puedes ayudar"
      />
      <EventosList
        eventos={eventosRes.data}
        initialPagination={eventosRes.meta.pagination}
      />
    </main>
  )
}