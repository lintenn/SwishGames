const express = require( 'express' );
const ChatController = require( '../controllers/ChatController.js' );
const router = express.Router();

router.get( '/', ChatController.getAllMessages );
router.get( '/fecha', ChatController.getAllMessagesOrderByDate );
router.get( '/nombre_usuario_receptor/:nombre_usuario_receptor/:nombre_usuario_emisor', ChatController.getAllMessagesOfOnePerson );
router.get( '/fecha/nombre_usuario_receptor/:nombre_usuario_receptor/:nombre_usuario_emisor', ChatController.getAllMessagesOfOnePerson );
router.get( '/:id', ChatController.getMessage );
router.get( '/  /:nombre_usuario_receptor/:nombre_usuario_emisor', ChatController.getMessageByUser );
router.post( '/', ChatController.createMessage );
router.put( '/:id', ChatController.updateMessage );
router.delete( '/:id', ChatController.deleteMessage );

module.exports = router;
