const express = require( 'express' );
const UserController = require( '../controllers/UserController.js' );
const router = express.Router();

router.get( '/', UserController.getAllUsers );
router.get( '/:id', UserController.getUser );
router.get( '/name/:name', UserController.getUserByName );
router.post( '/', UserController.createUser );
router.put( '/:id', UserController.updateUser );
router.put( '/connection/:name', UserController.updateConnectionUserByName );
router.delete( '/:id', UserController.deleteUser );

module.exports = router;
