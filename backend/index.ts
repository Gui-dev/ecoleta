import App from './src/App'

const port = process.env.PORT || 3333

App.listen( port, () => {
  console.log( `Servidor rodando na porta ${port}` )
} )