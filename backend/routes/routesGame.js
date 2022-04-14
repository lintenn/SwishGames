const express = require( 'express' );
const GameController = require( '../controllers/GameController.js' );
const router = express.Router();

router.get( '/', GameController.getAllGames );
router.get( '/:id', GameController.getGame );
router.get( '/buscar/:titulo', GameController.getSearchedGames );
router.get('/:id/buscar/:titulo', GameController.getSearchedGamesById);
router.get( '/mostrar/:titulo', GameController.getgameByName );
router.post( '/', GameController.createGame );
router.put( '/:id', GameController.updateGame );
router.delete( '/:id', GameController.deleteGame );

module.exports = router;
