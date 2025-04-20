import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { ContactoDetail } from "./ContactoDetails";
import { ExpandMore } from "@mui/icons-material";
import { Horario } from "../../app";
import { format, isToday, nextMonday, parse } from "date-fns";
import { es } from "date-fns/locale";


export default function HorariosSection({ horarios }: { horarios: Horario[] }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <ContactoDetail icon='punch_clock'>Horario</ContactoDetail>
      <HorarioButton horario={horarios} handleClick={handleClick} />
      <Box display='flex' alignItems='center' >
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            minWidth: '500px',
          }}
        >
          {
            horarios.map((horario) => (
              <HorarioItem key={horario.dia} horario={horario} handleClose={handleClose} />
            ))
          }
        </Menu>
      </Box>
    </Box>
  )
}

const HorarioItem = (props: { horario: Horario, handleClose: () => void }) => {
  const { dia, inicio, termino, abierto } = props.horario;
  let horas = '';
  const today = parse(dia, 'eeee', new Date(), { locale: es });

  if (abierto && inicio && termino) {
    const parsedInicio = parse(inicio, 'H:m:s', today);
    const parsedTermino = parse(termino, 'H:m:s', today);
    horas = `${format(parsedInicio, 'h:mm a')} - ${format(parsedTermino, 'h:mm a')}`
  } else {
    horas = 'Cerrado';
  }

  return (
    <MenuItem
      onClick={props.handleClose}
      sx={{
        justifyContent: 'space-between',
        columnGap: 4,
        ...(isToday(today) && {
          bgcolor: 'ButtonShadow',
          fontWeight: 600
        })
      }}>
      <Typography fontWeight='inherit'>{format(today, 'cccc', { locale: es })}</Typography>
      <span>{horas}</span>
    </MenuItem>
  )
}

const HorarioButton = ({ handleClick, horario }: { horario: Horario[], handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const idx = new Date().getDay() - 1;
  const currentHorario = horario[idx];
  const parsedHorarioDate = parse(currentHorario.dia, 'eeee', new Date(), { locale: es, weekStartsOn: 1 });
  const nextHorario = horario[(idx + 1) % horario.length];
  const nextInicio = nextHorario.inicio ? format(parse(nextHorario.inicio, 'H:m:s', new Date()), 'h:mm a') : null;

  let state = '';
  let color = 'conquiDarkBlue';
  let message = '';
  
  if (currentHorario.abierto && currentHorario.termino) {
    const parsedTermino = parse(currentHorario.termino, 'H:m:s', parsedHorarioDate);
    const now = new Date();
    const isOpen = now.getTime() < parsedTermino.getTime();

    state = isOpen ? 'Abierto' : 'Cerrado';
    color = isOpen ? '#2e7d32' : '#d32f2f';

    message = isOpen
      ? `cierra a las ${format(parsedTermino, 'h:mm a')}`
      : nextHorario.abierto
        ? `abre ${nextHorario.dia} a las ${nextInicio}`
        : 'abre lunes a las 9:00 AM';

  } else {
    state = 'Cerrado';
    message = nextHorario.abierto
      ? `abre ${nextHorario.dia} a las ${nextInicio}`
      : 'abre lunes a las 9:00 AM';
    color = '#d32f2f';
  }

  return (
    <Button
      onClick={handleClick}
      variant='text'
      sx={{ textTransform: 'none', ml: 5, color: '#151633' }} endIcon={<ExpandMore />}
    >
      <span style={{ fontWeight: 600, marginRight: '8px', color }}>
        {state}
      </span>
      •
      <span style={{ marginLeft: '8px' }}>
        {message}
      </span>
    </Button>
  )
}