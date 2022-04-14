const express = require('express')
const ContentsListsController = require('../controllers/ContentsListsController.js')
const router = express.Router()

router.get('/', ContentsListsController.getAllContentsLists);
router.get('/:id_lista', ContentsListsController.getContentsListsByList);
router.post('/', ContentsListsController.createContentsLists);
router.put('/:id', ContentsListsController.updateContentsLists);
router.delete('/:id', ContentsListsController.deleteContentsLists);

module.exports = router;
