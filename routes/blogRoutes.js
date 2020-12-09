const express = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('*', checkUser);
router.get('/create', requireAuth, blogController.blog_create_get);
router.get('/create_club', requireAuth, blogController.blog_create_club_get);
router.post('/create_club', requireAuth, blogController.blog_create_club_get);
router.get('/', requireAuth, blogController.blog_index);
router.post('/', requireAuth, blogController.blog_create_post);
router.get('/:id', requireAuth, blogController.blog_details);
router.delete('/:id', requireAuth, blogController.blog_delete);

module.exports = router;