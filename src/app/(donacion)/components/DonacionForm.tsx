'use client'

import { Frequency } from "@/app/(web)/app";
import { Favorite } from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, styled, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";


export default function DonacionForm(props: { elevation?: number, width?: number | string }) {
  const [frequency, setFrequency] = useState<Frequency>('one-time');
  const [oneTimeDonationValue, setOneTimeDonationValue] = useState('100');
  const [monthlyDonationValue, setMonthlyDonationValue] = useState('120');
  const [customAmount, setCustomAmount] = useState('');

  const handleCustomAmountChange = useCallback((value: string) => {
    if (!value) {
      setOneTimeDonationValue('100');
      setMonthlyDonationValue('120');
      setCustomAmount('')
      return;
    }

    setMonthlyDonationValue('');
    setOneTimeDonationValue('');
    setCustomAmount(value);
  }, []);

  let donationAmount = 0;
  if (customAmount) {
    donationAmount = parseFloat(customAmount)
  } else if ((frequency === 'one-time') && oneTimeDonationValue !== '') {
    donationAmount = parseFloat(oneTimeDonationValue);
  } else if ((frequency === 'monthly') && monthlyDonationValue !== '') {
    donationAmount = parseFloat(monthlyDonationValue);
  }


  return (
    <Box
      component={Paper}
      elevation={props.elevation !== undefined ? props.elevation : 2}
      px={3}
      py={5}
      sx={{
        width: '450px',
        backgroundColor: '#fbfdfe'
      }}>
      <Typography
        display='flex'
        fontSize={26}
        fontWeight={600}
        my={1}
        color="conquiDarkBlue.light"
        alignItems='center'>
        Cada peso cuenta <Favorite sx={{ ml: 1, color: 'inherit', fontSize: 30 }} />
      </Typography>
      <Typography variant="body1">Con tu ayuda, más niños recibirán tratamientos
        y apoyo en su lucha contra el cáncer.</Typography>
      <Stack rowGap={3}>
        <TabContext value={frequency}>
          <Tabs value={frequency} onChange={(_, newValue) => setFrequency(newValue)} variant="fullWidth">
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
                value: '400',
                label: '$400'
              }, {
                value: '500',
                label: '$500'
              }]}
            />
          </TabPanel>
          <TabPanel color="conquiDarkBlue" value='monthly' sx={{ p: 0, m: 0 }}>
            <CantidadDonacionGroup
              name='monthly'
              disabled={!!customAmount}
              onChange={(newValue) => setMonthlyDonationValue(newValue)}
              value={monthlyDonationValue}
              toggleButtons={[{
                value: '120',
                label: '$120'
              }, {
                value: '250',
                label: '$250'
              }, {
                value: '350',
                label: '$350'
              }, {
                value: '500',
                label: '$500'
              }]}
            />
          </TabPanel>
        </TabContext>
        <FormControl variant="outlined">
          <InputLabel htmlFor='custom-amount'>Otro monto</InputLabel>
          <OutlinedInput
            inputMode='numeric'
            type='number'

            onChange={(e) => handleCustomAmountChange(e.target.value)}
            label='Otro monto'
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            id='custom-amount' />
        </FormControl>
        <Button
          size="large"
          variant="contained"
          LinkComponent={Link}
          href={`/checkout?amount=${donationAmount}&frequency=${frequency}`}
          fullWidth
          disabled={!donationAmount}
          startIcon={<Favorite />}
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
  <Tab disableRipple color="conquiDarkBlue"  {...props} />
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