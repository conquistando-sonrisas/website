import { Box, CircularProgress, Container, Grid2, Pagination, PaginationItem, PopoverPaper, Typography } from '@mui/material';
import * as qs from 'qs'
import Link from 'next/link';
import NovedadesLayout from './components/NovedadesLayout';
import { Suspense } from 'react';
import SectionTitle from '../components/SectionTitle';

export default async function NovedadesPage() {
  return (<main style={{ minHeight: '100vh', backgroundColor: '#f1f7fc' }}>
    <Container maxWidth='lg' sx={{ my: 3 }}>
      <SectionTitle>Novedades</SectionTitle>
      <Suspense fallback={<CircularProgress />}>
        <NovedadesLayout />
      </Suspense>
    </Container>
  </main>)
}