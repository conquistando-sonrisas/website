import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { ContactoDetail } from "./ContactoDetails";
import { ExpandMore, TerminalOutlined } from "@mui/icons-material";
import { Horario } from "../../app";
import { format, getISODay, isToday, nextMonday, parse } from "date-fns";
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
      <HorarioButton horarios={horarios} handleClick={handleClick} />
      <Box display='flex' alignItems='center' >
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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

const HorarioButton = ({ handleClick, horarios }: { horarios: Horario[], handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const { state, message } = getStateAndMessage(horarios);
  const color = state === 'Abierto' ? '#2e7d32' : '#d32f2f';
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


const getStateAndMessage = (horarios: Horario[]): { state: string, message: string } => {
  const now = new Date();
  const idx = getISODay(now);
  const currentHorario = idx > 0 ? horarios[idx - 1] : horarios[0];
  const nextHorario = idx < horarios.length - 1 ? horarios[idx] : horarios[horarios.length - 1];
  const nextInicio = nextHorario.inicio ? parse(nextHorario.inicio, 'H:m:s', now) : null;

  const nextOpenMessage = nextInicio ? `abre "${nextHorario.dia}" a las ${format(nextInicio, 'h:mm a')}` : 'abre lunes a las 9:00 AM';
  let state = '';
  let message = '';

  if (!currentHorario.abierto) {
    state = 'Cerrado';
    message = nextOpenMessage;
    return { state, message };
  }

  const { inicio, termino } = currentHorario;

  if (!inicio || !termino) {
    throw new Error('El dia de hoy no tiene definido horas de inicio o termino');
  }

  const parsedInicio = parse(inicio, 'H:m:s', now);
  const parsedTermino = parse(termino, 'H:m:s', now);

  if (now < parsedInicio) {
    state = 'Cerrado';
    message = `abre a las ${format(parsedInicio, 'h:mm a')}`;
  } else if (now > parsedTermino) {
    state = 'Cerrado';
    message = nextOpenMessage;
  } else {
    state = 'Abierto';
    message = `cierra a las ${format(parsedInicio, 'h:mm a')}`;
  }

  return {
    state,
    message
  }
}