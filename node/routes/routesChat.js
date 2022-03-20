import express from 'express'
import { createMessage, deleteMessage, getAllMessages, getAllMessagesOrderByDate, getAllMessagesOfOnePerson, getAllMessagesOfOnePersonOrderByDate,getMessage, updateMessage } from '../controllers/ChatController.js'
const router = express.Router()

router.get('/', getAllMessages)
router.get('/fecha', getAllMessagesOrderByDate)
router.get('/nombre_usuario_receptor/:nombre_usuario_receptor/:nombre_usuario_emisor', getAllMessagesOfOnePerson)
router.get('/fecha/nombre_usuario_receptor/:nombre_usuario_receptor/:nombre_usuario_emisor', getAllMessagesOfOnePerson)
router.get('/:id', getMessage)
router.post('/', createMessage)
router.put('/:id', updateMessage)
router.delete('/:id', deleteMessage)

export default router