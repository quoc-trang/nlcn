import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'qt',
    email: 'qt@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  {
    name: 'first',
    email: 'qt@example.com',
    password: bcrypt.hashSync('12345', 10),
  },
  {
    name: 'second',
    email: 'qt@example.com',
    password: bcrypt.hashSync('12345', 10),
  },
  {
    name: 'third',
    email: 'qt@example.com',
    password: bcrypt.hashSync('12345', 10),
  },
]

export default users
