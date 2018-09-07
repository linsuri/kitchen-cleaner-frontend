import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const AppHeader = () => {
  return (
    <Container text>
        <Header
          className="header"
          as="h2"
          content="Cook Smart"
        />
    </Container>
  )
}

export default AppHeader
