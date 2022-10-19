import fs from 'fs'
import path from 'path'

import { User } from './types'

export function updateFile(filename: string, data: User | User[]) {
  return new Promise((resolve, reject) => {
    const _path = path.resolve(__dirname, '..', 'db', filename)

    fs.writeFile(_path, JSON.stringify({ data }), 'utf8', err => {
      if (err) {
        reject(err)
        return
      }
      resolve(true)
    })
  })
}

export function readFile(filename: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '..', 'db', filename), 'utf8', (err, jsonString) => {
      if (err) {
        console.log('Error reading file from disk:', err)
        reject(false)
        return
      }
      try {
        const dataObj = JSON.parse(jsonString)
        resolve(dataObj.data)
        return
      } catch (err) {
        console.log('Error parse JSON string', err)
        reject(false)
        return
      }
    })
  })
}

export async function getUsersData(): Promise<User[]> {
  const data = await readFile('users.json')
  return data as User[]
}

export function disableUser(id: string, users: User[]): User[] {
  return users.map(user => {
    return user.id === id
      ? {
          ...user,
          available: false
        }
      : user;
  });
}

export async function updateUsersData(usersData : User[]) {
  try {
    await updateFile('users.json', usersData);
    return true;
  } catch (err) {
    console.log('Error update users', err);
    return false;
  }
}