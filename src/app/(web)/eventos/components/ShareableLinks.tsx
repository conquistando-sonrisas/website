'use client'

import { Email, Facebook, FacebookRounded, LinkedIn, X } from "@mui/icons-material";
import { IconButton, Link, Snackbar, Stack } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";


export default function ShareableLinks() {
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_HOST}${pathname}`
  const [open, setOpen] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url)
    setOpen(true)
  }

  return (
    <Stack direction='row' columnGap={1} mb={5}>
      <ShareableLink
        Icon={<Facebook fontSize="inherit" />}
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      />
      <ShareableLink
        Icon={<X fontSize="inherit" />}
        href={`https://x.com/share?text=Checa este evento de Conquistando Sonrisas&url=${url}`}
      />
      <ShareableLink
        Icon={<LinkedIn fontSize="inherit" />}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
      />
      <ShareableLink
        Icon={<Email fontSize="inherit" />}
        href={`mailto:?body=Checa este evento de Conquistando Sonrisas ${url}`}
        title='Evento de Conquistando Sonrisas'
      />
      <IconButton
        onClick={handleCopyToClipboard}
        size="large"
        color="conquiDarkBlue">
        <LinkIcon fontSize="inherit" />
      </IconButton>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        onClose={() => setOpen(false)}
        message='Enlace copiado en el portapapeles'
        key={url}
      />
    </Stack>
  )
}

const ShareableLink = ({ Icon, href, title }: { Icon: ReactNode, href: string, title?: string }) => {

  return (
    <IconButton
      LinkComponent={Link}
      href={href}
      target="_blank"
      size="large"
      color="conquiDarkBlue"
      title={title}
    >
      {Icon}
    </IconButton>
  );
}