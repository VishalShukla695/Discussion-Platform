const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const User = require('./models/User');
const Discussion = require('./models/Discussion');
const Hashtag = require('./models/Hashtag');
const DiscussionHashtag = require('./models/DiscussionHashtag');
const Comment = require('./models/Comment');
const Like = require('./models/Like');
const Follow = require('./models/Follow');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Sync database
sequelize.sync().then(() => console.log('Database synced'));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/discussions', require('./routes/discussions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
