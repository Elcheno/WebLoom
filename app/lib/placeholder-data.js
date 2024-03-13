const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  }
];

const projects = [
  {
    userId: users[0],
    name: 'Project 1',
    description: 'Project 1 description',
    date: '2022-01-01',
    status: 'live',
    url: 'https://project1.com',
  }
]

module.exports = {
  users,
  projects
}