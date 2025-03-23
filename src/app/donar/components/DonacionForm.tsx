'use client'

import { Favorite } from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, styled, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useCallback, useState } from "react";


export default function DonacionForm(props: { elevation?: number, width?: number | string }) {
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
    <Box
      component={Paper}
      elevation={props.elevation !== undefined ? props.elevation : 2}
      px={3}
      py={5}
      sx={{
        width: '450px',
        backgroundColor: '#f1f7fc'
      }}>
      <Typography
        display='flex'
        fontSize={26}
        fontWeight={600}
        my={1}
        color="conquiDarkBlue.main"
        alignItems='center'>
        Cada peso cuenta <Favorite sx={{ ml: 1, color: 'inherit', fontSize: 30 }} />
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
          fullWidth
          onClick={() => console.log({ tabValue, donation, customAmount })}
          disabled={!donation}
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