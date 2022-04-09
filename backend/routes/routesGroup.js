const express = require( 'express' );
const ParticipantsGroupsController = require( '../controllers/ParticipantsGroupsController.js' );
const router = express.Router();

router.get( '/', ParticipantsGroupsController.getAllParticipantsGroups );
router.get( '/:id', ParticipantsGroupsController.getParticipantsGroups );
router.post( '/', ParticipantsGroupsController.createParticipantsGroups );
router.put( '/:id', ParticipantsGroupsController.updateParticipantsGroups );
router.delete( '/:id', ParticipantsGroupsController.deleteParticipantsGroups );

module.exports = router;
