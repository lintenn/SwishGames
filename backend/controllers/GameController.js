const JuegoModel = require( '../models/GameModel.js' );
const { Op } = require( 'sequelize' );

const getAllGames = async ( req, res ) => {

  try {

    const games = await JuegoModel.findAll();
    res.json( games );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getSearchedGames = async ( req, res ) => {

  try {

    const games = await JuegoModel.findAll({
      where: {
        titulo: {
          [Op.like]: `%${req.params.titulo}%`
        }
      }
    });
    res.json( games );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getSearchedGamesById = async ( req, res ) => {

  try {

    const games = await JuegoModel.findAll({
      where: { id: req.params.id, titulo: { [Op.like]: `%${req.params.titulo}%` } }
    });
    res.json( games );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};


const getgameByName = async ( req, res ) => {

  try {

    const games = await JuegoModel.findAll({
      where: { titulo: req.params.titulo }
    });
    res.json( games[0] );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getGame = async ( req, res ) => {

  try {

    const game = await JuegoModel.findAll({
      where: { id: req.params.id }
    });
    res.json( game );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const createGame = async ( req, res ) => {

  try {

    await JuegoModel.create( req.body );
    res.json({ message: '¡Registro creado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const updateGame = async ( req, res ) => {

  try {

    await JuegoModel.update( req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: '¡Registro actualizado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const deleteGame = async ( req, res ) => {

  try {

    await JuegoModel.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: '¡Registro borrado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

module.exports = { getAllGames, getGame, getSearchedGames, getSearchedGamesById, getgameByName, createGame, updateGame, deleteGame };
