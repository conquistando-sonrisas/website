'use client'

import { Box, Button, IconButton, Typography } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from "next/image";
import { useRouter } from "next/navigation";

const heights = [400, 250, 400, 450, 250, 250];

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: 15,
  color: theme.palette.text.secondary,
}));

export default function NoticiasMasonrySection(props: { noticias: { data: Array<{ titulo: string, documentId: string, fecha: string, cover: { formats: { medium: { url: string } } } }> } }) {
  return (
    <Box height='800px' width={1200} margin='auto'>
      <Masonry columns={3} spacing={4}>
        {props.noticias.data.map(({ cover, titulo, fecha, documentId }, index) => (
          <Box
            key={index}
            height={heights[index]}
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
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 2,
            }}></div>
            <Image
              src={`http://localhost:1337${cover.formats.medium.url}`}
              loader={({ src }) => src}
              fill
              objectFit='cover'
              objectPosition="center"
              alt="santa"
              style={{ zIndex: 1 }}
            />
            <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', position: 'absolute', top: 25, left: 10, bottom: 25 }}>
              <Typography fontWeight={600} color='conquiLightBlue' variant="caption" textAlign='left'>{fecha}</Typography>
              <Typography color='white' fontWeight={700} fontSize={24}>{titulo}</Typography>
              <GoToButton documentId={documentId} />
            </div>
          </Box>
        ))}
      </Masonry>
    </Box>
  )
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