import { Box, Button, IconButton, Typography } from "@mui/material";
import * as React from 'react';
import NoticiasMasonrySection from "./NoticiasMasonry";


export default async function Noticias() {
  const response = await fetch('http://localhost:1337/api/noticias?fields[0]=titulo&fields[1]=fecha&populate=*&sort[0]=fecha:asc&pagination[pageSize]=6');
  const noticias = await response.json();

  return (
    <Box height='800px' width={1200} margin='auto'>
      <NoticiasMasonrySection noticias={noticias} />
    </Box>)
}