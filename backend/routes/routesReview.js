const express = require( 'express' );
const ReviewController = require( '../controllers/ReviewController.js' );
const router = express.Router();

router.get('/', ReviewController.gettAllReviews);
router.get('/game/:id_juego', ReviewController.getReviewsByGame)
router.get('/usuario/:id_juego/:id_usuario', ReviewController.getReviewsByUserAndGame)
router.post('/', ReviewController.createReview)
router.put('/:id_juego/:id_usuario', ReviewController.updateReview)
router.delete('/:id_juego/:id_usuario', ReviewController.deleteReview)

module.exports = router;