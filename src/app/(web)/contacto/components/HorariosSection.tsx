import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { ContactoDetail } from "./ContactoDetails";
import { ExpandMore } from "@mui/icons-material";


export default function HorariosSection() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <ContactoDetail icon='punch_clock'>Horario</ContactoDetail>
      <Button
        onClick={handleClick}
        variant='text'
        color='success'
        sx={{ textTransform: 'none', ml: 5 }} endIcon={<ExpandMore />}>Abierto • Cierra a las 4:00 PM </Button>
      <Box display='flex' alignItems='center' >

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            minWidth: '500px',
          }}
        >
          <MenuItem sx={{ bgcolor: 'ButtonShadow', fontWeight: 600 }} onClick={handleClose}>
            <Typography mr={2} fontWeight='inherit'>Lunes</Typography> <span style={{ marginLeft: 'auto', paddingLeft: '5px' }}>9 AM - 4 PM</span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography mr={2}>Martes</Typography> <span style={{ marginLeft: 'auto', paddingLeft: '5px' }}>9 AM - 4 PM</span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography mr={2}>Miercoles</Typography> <span style={{ marginLeft: 'auto', paddingLeft: '5px' }}>9 AM - 4 PM</span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography mr={2}>Jueves</Typography> <span style={{ marginLeft: 'auto', paddingLeft: '5px' }}>9 AM - 4 PM</span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography mr={2}>Viernes</Typography> <span style={{ marginLeft: 'auto', paddingLeft: '5px' }}>9 AM - 4 PM</span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography mr={2}>Sabado</Typography> <span style={{ marginLeft: 'auto', paddingLeft: '5px' }}>Cerrado</span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography mr={2}>Domingo</Typography> <span style={{ marginLeft: 'auto', paddingLeft: '5px' }}>Cerrado</span>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}