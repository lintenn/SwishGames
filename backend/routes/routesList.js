const express = require('express')
const ListController = require('../controllers/ListController.js')
const router = express.Router()

router.get('/', ListController.getAllLists);
router.get('/user/:nombre_usuario', ListController.getListsByUser);
router.get('/user/:nombre_usuario/game/:id_juego', ListController.getListsByUserAndGame);
router.get('/user/:nombre_usuario/buscar/:nombre', ListController.getSearchedListByUser);
router.get('/:id_list', ListController.getList);
router.get('/buscar/:nombre', ListController.getSearchedList);
router.post('/', ListController.createList);
router.put('/:id_list', ListController.updateList);
router.delete('/:id_list', ListController.deleteList);

module.exports = router;