import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import path from 'path'

import { User } from './types'
import { Events } from './constants'
import {
    readFile,
    disableUser,
    getUsersData,
    updateUsersData,
   } from './utils'

const app = express()
const port = 3030

app.use('/static', express.static(path.resolve(__dirname, 'public')))

app.get('/users', async (_, res) => {
  const users = await getUsersData();
  res.send(JSON.stringify(users));
});

const server = app.listen(port, () => {
  console.log('server up and running on port ' + port);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on(Events.ChooseUserFromClient, async ({ id }) => {
    socket.broadcast.emit(Events.ChooseUserFromServer, { id })

    const users = await getUsersData()
    const changedUsers = disableUser(id, users)
    await updateUsersData(changedUsers as User[])
  })
})