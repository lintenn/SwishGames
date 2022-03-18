import express from 'express'
import { createMessage, deleteMessage, getAllMessages, getMessage, updateMessage } from '../controllers/ChatController.js'
const router = express.Router()

router.get('/', getAllMessages)
router.get('/:id', getMessage)
router.post('/', createMessage)
router.put('/:id', updateMessage)
router.delete('/:id', deleteMessage)

export default router