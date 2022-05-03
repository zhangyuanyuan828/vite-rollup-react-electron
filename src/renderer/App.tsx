import { useState } from 'react'
import { Container, Content, CustomProvider, Header } from 'rsuite'
import { Theme, ThemeProvider } from './theme'
import styles from './App.module.scss'

export function App() {
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <CustomProvider theme={theme}>
        <Container className={styles.container}>
          <Header className="header"></Header>
          <Content className="content"></Content>
        </Container>
      </CustomProvider>
    </ThemeProvider>
  )
}
