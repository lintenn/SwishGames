const express = require( 'express' );
const ContentsListsController = require( '../controllers/ContentsListsController.js' );
const router = express.Router();

router.get('/', ContentsListsController.getAllContentsLists);
router.get('/:id_lista', ContentsListsController.getContentsListsByList);
router.get('/:id_lista/buscar/:titulo', ContentsListsController.getSearchedContentsListsByList);
router.get('/favoritos/:nombre_usuario', ContentsListsController.getFavoritesContentsListsByUser);
router.get('/count/favoritos/:nombre_usuario', ContentsListsController.getFavoritesCountByUser);
router.post('/', ContentsListsController.createContentsLists);
router.put('/:id', ContentsListsController.updateContentsLists);
router.delete('/:id_lista/:id_juego', ContentsListsController.deleteContentsLists);

module.exports = router;
