const express = require('express');
const clubController = require('../controllers/clubController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('*', checkUser);
router.get('/create', requireAuth, clubController.club_create_get);
router.get('/', requireAuth, clubController.club_index);
router.post('/', requireAuth, clubController.club_create_post);
router.get('/:id', requireAuth, clubController.club_details);
router.delete('/:id', requireAuth, clubController.club_delete);
router.post('/:id', requireAuth, clubController.club_create_youtube_post);


module.exports = router;