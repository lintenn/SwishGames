const express = require( 'express' );
const RatingController = require( '../controllers/RatingController.js' );
const router = express.Router();

router.get('/', RatingController.gettAllRatings);
router.get('/juego/:id_juego', RatingController.getRatingsByGame);
router.get('/usuario/:id_usuario/:id_juego', RatingController.getRatingsByUserAndGame);
router.post('/', RatingController.createRating);
router.put('/:id_juego/:id_usuario', RatingController.updateRating);
router.delete('/:id_juego/:id_usuario', RatingController.deleteRating);

module.exports = router;
