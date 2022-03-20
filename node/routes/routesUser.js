import express from 'express'
import { createUser, deleteUser, getAllUsers, getUser, getUserByName, updateUser, updateConnectionUserByName } from '../controllers/UserController.js'
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.get('/name/:name', getUserByName)
router.post('/', createUser)
router.put('/:id', updateUser)
router.put('/connection/:name', updateConnectionUserByName)
router.delete('/:id', deleteUser)

export default router