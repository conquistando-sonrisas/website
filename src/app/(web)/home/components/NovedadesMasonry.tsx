'use client'

import { Box, Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from "next/image";
import Link from "next/link";
import { Novedad } from "../../app";

const heights = [380, 250, 380, 270, 400, 270];

export default function NovedadesMasonry(props: { novedades: Array<Novedad> }) {
  return (
    <>
      <Masonry
        columns={3}
        spacing={4}
        sequential
        defaultHeight={746}
        defaultColumns={3}
        defaultSpacing={4}
        sx={{
          maxWidth: 1200,
          m: 'auto',
          display: { xs: 'none', md: 'flex' },
          flexWrap: { xs: 'wrap' }
        }}>
        {props.novedades.map((novedad, index) => (
          <NovedadCard key={novedad.documentId} novedad={novedad} height={heights[index % heights.length]} />
        ))}
      </Masonry>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Stack direction='column' rowGap={3} my={3}>
          {(props.novedades.map(novedad => (
            <NovedadCard height={300} key={novedad.documentId} novedad={novedad} />
          )))}
        </Stack>
      </Box>
    </>
  )
}



const NovedadCard = (props: { novedad: Novedad, height?: number }) => {
  const { documentId, } = props.novedad;
  return (
    <Box
      key={documentId}
      {...(props.height && ({ height: props.height }))}
      sx={{
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 2,
      }}></div>
      <Image
        src={props.novedad.cover.formats.medium.url}
        loader={({ src }) => src}
        fill
        objectFit='cover'
        objectPosition="center"
        alt=""
        style={{ zIndex: 1, userSelect: 'none' }}
      />
      <div style={{
        color: '#f1f7fc',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 35,
        left: 10,
        right: 10,
        bottom: 25
      }}>
        <Typography color="inherit" fontWeight={700} fontSize={24} >{props.novedad.titulo}</Typography>
        <Typography color="inherit" fontWeight={600} variant="caption" textAlign='left'>{
          new Date(props.novedad.publishedAt).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        }</Typography>
        <GoToButton documentId={documentId} />
      </div>
      <Box
        component='span'
        sx={{
          zIndex: 10,
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'conquiYellow.light',
          color: 'conquiDarkBlue.light',
          maxWidth: 'fit-content',
          py: .1,
          px: .4,
          borderRadius: 1,
          userSelect: 'none'
        }}>
        <Typography variant="caption">
          {props.novedad.tipo}
        </Typography>
      </Box>
    </Box >
  )
}

const GoToButton = (props: { documentId: string }) => {
  return (
    <Button
      LinkComponent={Link}
      href={`/novedades/${props.documentId}`}
      endIcon={<ArrowForwardIcon />}
      variant="contained"
      color="conquiLightBlue"
      size="small"
      sx={{
        textTransform: 'none',
        width: 'fit-content',
        mt: 'auto',
        borderRadius: '25px'
      }}>
      Leer más
    </Button>
  )
}