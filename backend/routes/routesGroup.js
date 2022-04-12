const express = require( 'express' );
const GroupController = require( '../controllers/GroupController.js' );
const router = express.Router();

router.get( '/', GroupController.getAllGroups );
router.get( '/:id', GroupController.getGroup );
router.get( '/groupByNameUser/:nombre_creador', GroupController.getLastGroupByNameUser );
router.post( '/', GroupController.createGroup );
router.put( '/:id', GroupController.updateGroup );
router.delete( '/:id', GroupController.deleteGroup );

module.exports = router;