const express = require('express')
const ListController = require('../controllers/ListController.js')
const router = express.Router()

router.get('/', ListController.getAllLists);
router.get('/:id_user', ListController.getListsByUser);
router.get('/:id_user/buscar/:nombre', ListController.getSearchedListByUser);
//router.get('/:id_list', ListController.getList);
router.get('/buscar/:nombre', ListController.getSearchedList);
router.post('/', ListController.createList);
router.put('/:id_list', ListController.updateList);
router.delete('/:id_list', ListController.deleteList);

module.exports = router;