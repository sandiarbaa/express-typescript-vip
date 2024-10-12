import express, { Application, NextFunction, Request, Response } from 'express'

const app: Application = express()
const port: number = 4000

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: '200', data: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
