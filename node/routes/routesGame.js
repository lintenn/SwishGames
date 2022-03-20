import express from 'express'
import { createGame, deleteGame, getAllGames, getGame, updateGame } from '../controllers/GameController.js'
const router = express.Router()

router.get('/', getAllGames)
router.get('/:id', getGame)
router.post('/', createGame)
router.put('/:id', updateGame)
router.delete('/:id', deleteGame)

export default router