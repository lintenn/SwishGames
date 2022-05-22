const express = require( 'express' );
const RatingController = require( '../controllers/RatingController' );
const router = express.Router();

router.get('/', RatingController.gettAllRatings);
router.get('/:id_juego', RatingController.getRatingsByGame);
router.get('/:id_usuario', RatingController.getRatingsByUser);
router.post('/', RatingController.createRating);
router.put('/:id_juego/:id_usuario', RatingController.updateRating);
router.delete('/:id_juego/:id_usuario', RatingController.deleteRating);

module.exports = router;
