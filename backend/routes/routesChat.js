const express = require( 'express' );
const ChatController = require( '../controllers/ChatController.js' );
const router = express.Router();

router.get( '/:nombre_user', ChatController.getAllMessages );
router.get( '/fecha/:nombre_user', ChatController.getAllMessagesOrderByDate );
router.post( '/chat_by_entry/', ChatController.getMessageByUserByEntry );
router.get( '/response/:id_mensaje', ChatController.getMessageResponse );
router.post( '/', ChatController.createMessage );
router.put( '/:id', ChatController.updateMessage );
router.delete( '/:id', ChatController.deleteMessage );

module.exports = router;
