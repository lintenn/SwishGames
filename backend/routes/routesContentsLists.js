const express = require('express')
const ContentsListsController = require('../controllers/ContentsListsController.js')
const router = express.Router()

router.get('/', ContentsListsController.getAllContentsLists);
router.get('/:id_list', ContentsListsController.getContentsListsByList);
router.post('/', ContentsListsController.createContentsLists);
router.put('/:id_list', ContentsListsController.updateContentsLists);
router.delete('/:id_list', ContentsListsController.deleteContentsLists);

module.exports = router;
