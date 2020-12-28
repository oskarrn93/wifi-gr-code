import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'

test('renders app page', async () => {
  render(<App />)
  const appElement = await screen.findByTestId('app')
  console.log('appElement', appElement)
  expect(appElement).toBeInTheDocument()
})
