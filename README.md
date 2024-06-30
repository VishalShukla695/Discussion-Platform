# Discussion Platform

This is a discussion platform built with Node.js, Express.js, and MySQL. The platform allows users to sign up, log in, create discussions, comment on discussions, and follow other users. It includes a variety of features such as searching users, posting discussions with hashtags, liking comments, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Postman Collection](#postman-collection)
- [Project Structure](#project-structure)
- [License](#license)

## Features

1. User can sign up and log in
2. User can create, update, and delete discussions
3. Users can add comments and like discussions or comments
4. Users can follow other users
5. Users can search for other users by name
6. Users can search for discussions based on hashtags or text content

## Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize (ORM)
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MySQL Server

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd discussion-platform
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Database Setup

1. Create a MySQL database:

    ```sql
    CREATE DATABASE discussion_platform;
    ```

2. Update the `config/database.js` file with your MySQL credentials:

    ```javascript
    const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize('discussion_platform', 'username', 'password', {
      host: 'localhost',
      dialect: 'mysql'
    });

    module.exports = sequelize;
    ```

### Running the Server

1. Sync the database and start the server:

    ```bash
    node server.js
    ```

2. The server will start on port 5000. You can change this by updating the `PORT` variable in `server.js`.

## API Endpoints

### User Endpoints

- **Create User**: `POST /api/users`
- **Update User**: `PUT /api/users/:id`
- **Delete User**: `DELETE /api/users/:id`
- **Get List of Users**: `GET /api/users`
- **Search User by Name**: `GET /api/users/search?name=<name>`

### Discussion Endpoints

- **Create Discussion**: `POST /api/discussions`
- **Update Discussion**: `PUT /api/discussions/:id`
- **Delete Discussion**: `DELETE /api/discussions/:id`
- **Get Discussions by Tags**: `GET /api/discussions/tags?tags=<tags>`
- **Get Discussions by Text**: `GET /api/discussions/text?text=<text>`

### Comment Endpoints

- **Add Comment**: `POST /api/discussions/:id/comments`

### Like Endpoints

- **Like Discussion or Comment**: `POST /api/discussions/:id/like`

### Follow Endpoints

- **Follow User**: `POST /api/users/:id/follow`

## Database Schema

- **Users**: id, name, mobile_no, email, password
- **Discussions**: id, user_id, text, image_url, created_at, updated_at
- **Hashtags**: id, name
- **DiscussionHashtags**: id, discussion_id, hashtag_id
- **Comments**: id, discussion_id, user_id, text, created_at, updated_at
- **Likes**: id, user_id, discussion_id, comment_id
- **Follows**: id, follower_id, followed_id

## Postman Collection

A Postman collection for testing the APIs can be found [here](#). Import it into Postman to test the endpoints.

## Project Structure

```plaintext
discussion-platform/
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Discussion.js
│   ├── Hashtag.js
│   ├── DiscussionHashtag.js
│   ├── Comment.js
│   ├── Like.js
│   └── Follow.js
├── routes/
│   ├── users.js
│   └── discussions.js
├── server.js
├── package.json
└── README.md
