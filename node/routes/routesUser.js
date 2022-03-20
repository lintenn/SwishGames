import express from 'express'
import { createUser, deleteUser, getAllUsers, getUser, getUserByName, updateUser } from '../controllers/UserController.js'
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.get('/name/:name', getUserByName)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router