import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* A6 size */
  height: 14.8cm;
  width: 10.5cm;

  /*background-color: cornflowerblue;*/
`
const StyledHeading = styled.h1`
  font-size: 28px;
  margin-bottom: 1cm;
`

const StyledQRCode = styled.img`
  width: 4cm;
  height: auto;
`

const StyledSSID = styled.div`
  margin-top: 1cm;
  font-size: 18px;
`
const StyledPassword = styled(StyledSSID)`
  margin-top: 0.3cm;
`

export const App: React.FC = () => {
  const SSID = process.env.REACT_APP_SSID
  const ENCRYPTION = process.env.REACT_APP_ENCRYPTION
  const PASSWORD = process.env.REACT_APP_PASSWORD

  console.log({ SSID, ENCRYPTION, PASSWORD })

  const [qrCodeDataURL, setQrCodeDataURL] = useState('')

  const qrCodeData = `WIFI:S:${SSID};T:${ENCRYPTION};P:${PASSWORD};;`

  useEffect(() => {
    const asyncFunction = async () => {
      const tmp = await QRCode.toDataURL(qrCodeData)
      console.log('tmp', tmp)
      setQrCodeDataURL(tmp)
    }
    asyncFunction()
  }, [qrCodeData])

  if (!SSID || !ENCRYPTION || !PASSWORD)
    return (
      <StyledWrapper data-testid="app">
        Missing required parameters from .env file to generate QR Code
      </StyledWrapper>
    )

  return (
    <StyledWrapper data-testid="app">
      <StyledHeading>Guest WIFI Credentials</StyledHeading>
      <StyledQRCode src={qrCodeDataURL} />
      <StyledSSID>
        <b>SSID:</b> {SSID}
      </StyledSSID>
      <StyledPassword>
        <b>Password:</b> {PASSWORD}
      </StyledPassword>
    </StyledWrapper>
  )
}
