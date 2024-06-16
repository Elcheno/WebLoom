const { randomUUID } = require("crypto");

const users = [
  {
    id: 'ecfdc2a1-2198-41ce-b5ee-8a273328e3ff',
    name: "John Doe",
    username: "johndoe",
    simple_username: "johndoe",
    email: "johndoe@me.com",
    created_at: '2024-06-14 12:00:52.528959+00'
  },
  {
    id: 'e5138f74-db49-412b-b0a4-5a10f338c24c',
    name: "Mary Jane",
    username: "maryjane",
    simple_username: "maryjane",
    email: "maryjane@me.com",
    created_at: '2024-06-14 12:00:52.528959+00'
  }
]

const projects = [
  {
    id: 'e14dd2e5-0200-4a03-a3b9-69899786b62d',
    name: "Project 1",
    simple_name: "project1",
    description: "Project 1 description",
    url: "https://www.project1.com",
    user_id: 'ecfdc2a1-2198-41ce-b5ee-8a273328e3ff',
    created_at: '2024-06-14 12:00:52.528959+00'
  },
  {
    id: '8300027b-3732-4445-a5e0-13e1d40cbdaa',
    name: "Project 2",
    simple_name: "project2",
    description: "Project 2 description",
    url: "https://www.project2.com",
    user_id: 'ecfdc2a1-2198-41ce-b5ee-8a273328e3ff',
    created_at: '2024-06-14 12:00:52.528959+00'
  },
  {
    id: 'ad708dc5-b696-463f-9dd6-2981fb68f598',
    name: "Project 3",
    simple_name: "project3",
    description: "Project 3 description",
    url: "https://www.project3.com",
    user_id: 'ecfdc2a1-2198-41ce-b5ee-8a273328e3ff',
    created_at: '2024-06-14 12:00:52.528959+00'
  },
  {
    id: 'ebdf16c0-0b16-4d00-8690-08903cf73649',
    name: "Project 4",
    simple_name: "project4",
    description: "Project 4 description",
    url: "https://www.project4.com",
    user_id: 'e5138f74-db49-412b-b0a4-5a10f338c24c',
    created_at: '2024-06-14 12:00:52.528959+00'
  }
]

const public = [
  {
    project_id: 'e14dd2e5-0200-4a03-a3b9-69899786b62d',
    created_at: '2024-06-14 12:00:52.528959+00'
  },
  {
    project_id: 'ad708dc5-b696-463f-9dd6-2981fb68f598',
    created_at: '2024-06-14 12:00:52.528959+00'
  }
]

const private = [
  {
    project_id: '8300027b-3732-4445-a5e0-13e1d40cbdaa',
    created_at: '2024-06-14 12:00:52.528959+00'
  },
  {
    project_id: 'ebdf16c0-0b16-4d00-8690-08903cf73649',
    created_at: '2024-06-14 12:00:52.528959+00'
  }
]

module.exports = {
  users,
  projects,
  public,
  private
}