'use client'
import {
  Box, Button, FormControl,
  Grid2, InputAdornment, InputLabel, OutlinedInput,
  Paper, Stack, Tab, Tabs,
  ToggleButton, ToggleButtonGroup, Typography
} from "@mui/material"
import Image from "next/image";
import conquiKid from '../../../../public/conqui_kid.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ReactNode, SyntheticEvent, useCallback, useState } from "react";
import styled from "@emotion/styled";
import { TabContext, TabPanel } from "@mui/lab";
import localFont from 'next/font/local'


const mikHaloo = localFont({
  src: '../../Mikhaloo.ttf',
  display: 'swap'
})


const HeroSection = (props: { conquiKidSrc: string }) => {
  return (
    <Grid2 component='section' container height='75vh' sx={{
      background: 'linear-gradient(145deg, rgba(136,147,228,1) 0%, rgba(136,192,228,1) 100%)',
      maxHeight: '75vh',
      px: { md: 2, xs: 0 }
    }}>
      <Grid2
        display="flex"
        justifyContent="center"
        alignItems="center"
        size={{ xs: 12, md: 7 }} sx={{ position: 'relative', height: 'inherit' }}>
        <Image
          src={props.conquiKidSrc}
          height={0}
          width={0}
          layout="fill"
          style={{ objectFit: 'cover' }}
          alt=""
        />
        <Typography
          textAlign='center'
          fontWeight={600}
          sx={{
            backgroundColor: 'conquiYellow.light',
            color: '#210439',
            position: 'absolute',
            bottom: 30,
            px: 2,
            mx: 3,
            borderRadius: 3,
            fontSize: { xs: 30, sm: 40, lg: 50 },
          }}>Porque una <span className={mikHaloo.className} style={{ fontSize: '.7em' }}>sonrisa</span> lo puede todo</Typography>
      </Grid2>
      <Grid2
        display={{ xs: 'none', md: 'flex' }}
        justifyContent='center'
        alignItems='center'
        size={{ xs: 12, md: 5 }}
      >
        <DonacionForm />
      </Grid2>
    </Grid2>
  )
}


const DonacionForm = () => {
  const [tabValue, setTabValue] = useState('one-time');
  const [oneTimeDonationValue, setOneTimeDonationValue] = useState('100');
  const [monthlyDonationValue, setMonthlyDonationValue] = useState('25');
  const [customAmount, setCustomAmount] = useState('');

  const handleCustomAmountChange = useCallback((value: string) => {
    if (!value) {
      setOneTimeDonationValue('100');
      setMonthlyDonationValue('25');
      setCustomAmount('')
      return;
    }

    setMonthlyDonationValue('');
    setOneTimeDonationValue('');
    setCustomAmount(value);
  }, []);

  let donation = 0;
  if (customAmount) {
    donation = parseFloat(customAmount)
  } else if ((tabValue === 'one-time') && oneTimeDonationValue !== '') {
    donation = parseFloat(oneTimeDonationValue);
  } else if ((tabValue === 'monthly') && monthlyDonationValue !== '') {
    donation = parseFloat(monthlyDonationValue);
  }

  return (
    <Box component={Paper} px={3} py={5} sx={{ width: '400px', backgroundColor: '#f1f7fc' }}>
      <Typography
        display='flex'
        fontSize={26}
        fontWeight={600}
        my={1}
        color="conquiDarkBlue.main"
        alignItems='center'>
        Cada peso cuenta <FavoriteIcon sx={{ ml: 1, color: 'inherit', fontSize: 30 }} />
      </Typography>
      <Typography variant="body1">Con tu ayuda, más niños recibirán tratamientos
        y apoyo en su lucha contra el cáncer.</Typography>
      <Stack rowGap={3}>
        <TabContext value={tabValue}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} variant="fullWidth">
            <StyledTab label='Una vez' value='one-time' id='tipo-donacion-una-vez' />
            <StyledTab label='Mensual' value='monthly' id='tipo-donacion-mensual' />
          </Tabs>
          <TabPanel value='one-time' sx={{ p: 0, m: 0 }}>
            <CantidadDonacionGroup
              name='one-time'
              disabled={!!customAmount}
              onChange={(newValue) => setOneTimeDonationValue(newValue)}
              value={oneTimeDonationValue}
              toggleButtons={[{
                value: '100',
                label: '$100'
              }, {
                value: '250',
                label: '$250'
              }, {
                value: '500',
                label: '$500'
              }, {
                value: '1000',
                label: '$1,000'
              }]}
            />
          </TabPanel>
          <TabPanel value='monthly' sx={{ p: 0, m: 0 }}>
            <CantidadDonacionGroup
              name='monthly'
              disabled={!!customAmount}
              onChange={(newValue) => setMonthlyDonationValue(newValue)}
              value={monthlyDonationValue}
              toggleButtons={[{
                value: '25',
                label: '$25'
              }, {
                value: '50',
                label: '$50'
              }, {
                value: '80',
                label: '$80'
              }, {
                value: '100',
                label: '$100'
              }]}
            />
          </TabPanel>
        </TabContext>
        <FormControl variant="outlined">
          <InputLabel htmlFor='custom-amount'>Otro monto</InputLabel>
          <OutlinedInput
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            label='Otro monto'
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            id='custom-amount' />
        </FormControl>
        <Button
          size="large"
          variant="contained"
          fullWidth
          onClick={() => console.log({ tabValue, donation, customAmount })}
          disabled={!donation}
          startIcon={<FavoriteIcon />}
          sx={{
            backgroundColor: 'conquiYellow.main',
            color: '#210439',
            fontSize: 18,
            borderRadius: 10,
            ':hover': {
              backgroundColor: '#e8b419'
            }
          }}>Donar</Button>
      </Stack >
    </Box >
  );
}


type StyledTabProp = {
  label: string,
  value: string,
  id: string
}
const StyledTab = styled((props: StyledTabProp) => (
  <Tab disableRipple  {...props} />
))(({ theme }) => ({
  textTransform: 'none',
}))


type CantidadDonacionGroupProps = {
  name: string,
  disabled: boolean,
  value: string,
  onChange: (newValue: string) => void,
  toggleButtons: Array<{
    value: string,
    label: string
  }>
}
const CantidadDonacionGroup = (props: CantidadDonacionGroupProps) => {
  return (
    <ToggleButtonGroup
      size="large"
      exclusive
      color='primary'
      disabled={props.disabled}
      value={props.value}
      onChange={(_, newValue) => props.onChange(newValue)}
      style={{ alignItems: 'stretch', width: '100%' }}
    >
      {
        props.toggleButtons.map(({ value, label }, idx) => (
          <ToggleButton key={`${props.name}-${idx}`} disableRipple style={{ flex: 1 }} value={value}>{label}</ToggleButton>
        ))
      }
    </ToggleButtonGroup>
  )
}

export default HeroSection;