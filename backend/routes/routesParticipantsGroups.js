const express = require( 'express' );
const ParticipantsGroupsController = require( '../controllers/ParticipantsGroupsController.js' );
const router = express.Router();
router.get( '/', ParticipantsGroupsController.getAllParticipantsGroups );
router.get( '/:id', ParticipantsGroupsController.getParticipantsGroups );
router.get( '/grupos/:nombre_usuario', ParticipantsGroupsController.getGroupsByNameUser );
router.get( '/users/:id_grupo', ParticipantsGroupsController.getUsersByGroups );
router.get( '/notUsers/:id_grupo', ParticipantsGroupsController.getNotUsersByGroups );
router.post( '/', ParticipantsGroupsController.createParticipantsGroups );
router.put( '/:id', ParticipantsGroupsController.updateParticipantsGroups );
router.delete( '/:id', ParticipantsGroupsController.deleteParticipantsGroups );
router.delete( '/:id_grupo/participant/:nombre_usuario', ParticipantsGroupsController.deleteParticipantsGroupsByGroupAndUser );

module.exports = router;
