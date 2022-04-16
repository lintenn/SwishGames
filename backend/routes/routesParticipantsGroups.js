const express = require( 'express' );
const ParticipantsGroupsController = require( '../controllers/ParticipantsGroupsController.js' );
const router = express.Router();
router.get( '/', ParticipantsGroupsController.getAllParticipantsGroups );
router.get( '/:id', ParticipantsGroupsController.getParticipantsGroups );
router.get( '/grupos/:nombre_usuario', ParticipantsGroupsController.getGroupsByNameUser );
router.get( '/users/:id_grupo', ParticipantsGroupsController.getUsersByGroups );
router.post( '/', ParticipantsGroupsController.createParticipantsGroups );
router.put( '/:id', ParticipantsGroupsController.updateParticipantsGroups );
router.delete( '/:id', ParticipantsGroupsController.deleteParticipantsGroups );

module.exports = router;
