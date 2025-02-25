'use client'

import { Box, Button, IconButton, Typography } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from "next/image";
import { useRouter } from "next/navigation";

const heights = [400, 250, 400, 250, 400, 250];

export default function NovedadesMasonry(props: { noticias: Array<{ titulo: string, documentId: string, publishedAt: string, cover: { formats: { medium: { url: string } } } }> }) {
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
        {props.noticias.map(({ cover, titulo, publishedAt, documentId }, index) => (
          <Box
            key={documentId}
            height={heights[index % (heights.length)]}
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
              src={cover.formats.medium.url}
              loader={({ src }) => src}
              fill
              objectFit='cover'
              objectPosition="center"
              alt=""
              style={{ zIndex: 1, userSelect: 'none' }}
            />
            <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', position: 'absolute', top: 25, left: 10, right: 10, bottom: 25 }}>
              <Typography fontWeight={600} color='white' variant="caption" textAlign='left'>{new Date(publishedAt).toLocaleDateString('es-MX')}</Typography>
              <Typography color='white' fontWeight={700} fontSize={24}>{titulo}</Typography>
              <GoToButton documentId={documentId} />
            </div>
          </Box>
        ))}
      </Masonry>
      <Box display={{ xs: 'block', md: 'none' }}>
        <pre>{JSON.stringify(props.noticias.slice(2), null, 2)}</pre>
      </Box>
    </>
  )
}


interface MediaSize {
  ext: string;
  url: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}
interface Media {
  formats: {
    large: MediaSize,
    small: MediaSize,
    medium: MediaSize,
    thumbnail: MediaSize
  }
}
interface Novedad {
  titulo: string,
  documentId: string,
  publishedAt: string,
  cover: { formats: { medium: { url: string } } }
}

const NovedadCard = (props: {}) => {

}

const GoToButton = (props: { documentId: string }) => {
  const navigation = useRouter();

  return (
    <Button
      onClick={() => navigation.push(`/noticias/${props.documentId}`)}
      endIcon={<ArrowForwardIcon />}
      variant="contained"
      color="conquiLightBlue"
      sx={{
        textTransform: 'none',
        maxWidth: 120,
        mt: 'auto',
        borderRadius: '25px'
      }}>
      Leer más
    </Button>
  )
}