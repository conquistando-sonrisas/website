'use client'

import { Frequency } from "@/app/(web)/app";
import { Favorite } from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Button, Paper, Stack, styled, Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { use, useCallback, useState } from "react";
import { NumericFormat } from 'react-number-format'

const donationDefaultValues = {
  monthly: '250',
  oneTime: '250',
  custom: ''
}

export default function DonacionForm(props: { elevation?: number, width?: number | string }) {
  const [frequency, setFrequency] = useState<Frequency>('oneTime');
  const [donation, setDonation] = useState(donationDefaultValues)
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleCustomAmountChange = useCallback((value: string) => {
    setErrorMessage('')
    if (!value) {
      setDonation(donationDefaultValues)
      return;
    }

    setDonation({
      monthly: '',
      oneTime: '',
      custom: value
    })
  }, []);

  const handleFrequencyChange = useCallback((frequency: Frequency, value: string) => {
    setErrorMessage('')
    setDonation(pre => ({ ...pre, [frequency]: value }))
    setFrequency(frequency)
  }, []);

  const handleSubmit = useCallback(() => {
    const { custom, monthly, oneTime } = donation;
    let donationAmount = 0;
    if (custom) {
      donationAmount = parseFloat(custom)
    } else if ((frequency === 'oneTime') && oneTime !== '') {
      donationAmount = parseFloat(oneTime);
    } else if ((frequency === 'monthly') && monthly !== '') {
      donationAmount = parseFloat(monthly);
    }

    if (donationAmount < 98) {
      setErrorMessage('Ingresa un monto mayor o igual a 98 pesos, por favor')
      return;
    }

    if (donationAmount > 195_000) {
      setErrorMessage('Ingresa un valor menor o igual a 195,000 pesos, por favor')
      return;
    }

    if (!donationAmount) {
      setErrorMessage('Ingresa o selecciona un monto válido para donar, por favor')
      return;
    }

    router.push(`/checkout?amount=${donationAmount}&frequency=${frequency}`)
  }, [donation, frequency]);


  return (
    <Box
      component={Paper}
      elevation={props.elevation !== undefined ? props.elevation : 2}
      px={3}
      py={5}
      sx={{
        width: '450px',
        backgroundColor: 'conquiLightBlue.50'
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
            <StyledTab label='Una vez' value='oneTime' id='tipo-donacion-una-vez' />
            <StyledTab label='Mensual' value='monthly' id='tipo-donacion-mensual' />
          </Tabs>
          <TabPanel value='oneTime' sx={{ p: 0, m: 0 }}>
            <CantidadDonacionGroup
              name='oneTime'
              disabled={!!donation.custom}
              onChange={(newValue) => handleFrequencyChange('oneTime', newValue)}
              value={donation.oneTime}
              donationValues={['100', '250', '400', '500']}
            />
          </TabPanel>
          <TabPanel color="conquiDarkBlue" value='monthly' sx={{ p: 0, m: 0 }}>
            <CantidadDonacionGroup
              name='monthly'
              disabled={!!donation.custom}
              onChange={(newValue) => handleFrequencyChange('monthly', newValue)}
              value={donation.monthly}
              donationValues={['120', '250', '350', '500']}
            />
          </TabPanel>
        </TabContext>
        <NumericFormat
          error={!!errorMessage}
          helperText={errorMessage}
          onValueChange={values => handleCustomAmountChange(values.value)}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString={true}
          label='Otro monto'
          allowNegative={false}
          allowLeadingZeros={false}
          prefix='$'
        />
        <Button
          size="large"
          variant="contained"
          onClick={handleSubmit}
          fullWidth
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
  donationValues: string[]
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
        props.donationValues.map((value, idx) => (
          <ToggleButton key={`${props.name}-${idx}`} disableRipple style={{ flex: 1 }} value={value}>${value}</ToggleButton>
        ))
      }
    </ToggleButtonGroup>
  )
}