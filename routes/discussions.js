const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');
const Hashtag = require('../models/Hashtag');
const DiscussionHashtag = require('../models/DiscussionHashtag');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

// Create Discussion
router.post('/', async (req, res) => {
  const { user_id, text, image_url, hashtags } = req.body;
  try {
    const discussion = await Discussion.create({
      user_id,
      text,
      image_url
    });
    if (hashtags && hashtags.length > 0) {
      for (const tag of hashtags) {
        let hashtag = await Hashtag.findOne({ where: { name: tag } });
        if (!hashtag) {
          hashtag = await Hashtag.create({ name: tag });
        }
        await DiscussionHashtag.create({
          discussion_id: discussion.id,
          hashtag_id: hashtag.id
        });
      }
    }
    res.json(discussion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update Discussion
router.put('/:id', async (req, res) => {
  const { text, image_url, hashtags } = req.body;
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion not found' });
    }
    await discussion.update({
      text,
      image_url
    });
    if (hashtags && hashtags.length > 0) {
      await DiscussionHashtag.destroy({ where: { discussion_id: discussion.id } });
      for (const tag of hashtags) {
        let hashtag = await Hashtag.findOne({ where: { name: tag } });
        if (!hashtag) {
          hashtag = await Hashtag.create({ name: tag });
        }
        await DiscussionHashtag.create({
          discussion_id: discussion.id,
          hashtag_id: hashtag.id
        });
      }
    }
    res.json(discussion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete Discussion
router.delete('/:id', async (req, res) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion not found' });
    }
    await DiscussionHashtag.destroy({ where: { discussion_id: discussion.id } });
    await discussion.destroy();
    res.json({ msg: 'Discussion removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get Discussions by Tags
router.get('/tags', async (req, res) => {
  const { tags } = req.query;
  try {
    const hashtags = tags.split(',');
    const discussions = await Discussion.findAll({
      include: {
        model: Hashtag,
        where: {
          name: {
            [Sequelize.Op.in]: hashtags
          }
        }
      }
    });
    res.json(discussions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get Discussions by Text
router.get('/text', async (req, res) => {
  const { text } = req.query;
  try {
    const discussions = await Discussion.findAll({
      where: {
        text: {
          [Sequelize.Op.like]: `%${text}%`
        }
      }
    });
    res.json(discussions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add Comment
router.post('/:id/comments', async (req, res) => {
  const { user_id, text } = req.body;
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion not found' });
    }
    const comment = await Comment.create({
      discussion_id: req.params.id,
      user_id,
      text
    });
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Like Discussion or Comment
router.post('/:id/like', async (req, res) => {
  const { user_id, comment_id } = req.body;
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion not found' });
    }
    const like = await Like.create({
      user_id,
      discussion_id: req.params.id,
      comment_id
    });
    res.json(like);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Follow User
router.post('/:id/follow', async (req, res) => {
  const { follower_id } = req.body;
  try {
    const followed_id = req.params.id;
    const follow = await Follow.create({
      follower_id,
      followed_id
    });
    res.json(follow);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
