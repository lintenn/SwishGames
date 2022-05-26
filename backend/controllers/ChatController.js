const ChatModel = require( '../models/ChatModel.js' );
const { Op, Sequelize } = require( 'sequelize' );
const db = require("../database/mysql.js")

const getAllMessages = async ( req, res ) => {

  try {

    const chats = await ChatModel.findAll();

    // do sequelize query 

    res.json( chats );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getAllMessagesOrderByDate = async ( req, res ) => {

  try {

    const chats = await ChatModel.findAll({
      order: [['fecha_envio', 'DESC']]
    });
    res.json( chats );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getAllMessagesOfOnePerson = async ( req, res ) => {

  try {

    const chats = await ChatModel.findAll({
      where: {
        [Op.or]: [
          {
            nombre_usuario_receptor: req.params.nombre_usuario_receptor,
            nombre_usuario_emisor: req.params.nombre_usuario_emisor
          },
          {
            nombre_usuario_emisor: req.params.nombre_usuario_receptor,
            nombre_usuario_receptor: req.params.nombre_usuario_emisor
          }
        ]
      }


    });
    res.json( chats );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};


const getAllMessagesOfOnePersonOrderByDate = async ( req, res ) => {

  try {

    const chats = await ChatModel.findAll({
      where: {
        [Op.or]: [
          {
            nombre_usuario_receptor: req.params.nombre_usuario_receptor,
            nombre_usuario_emisor: req.params.nombre_usuario_emisor
          },
          {
            nombre_usuario_emisor: req.params.nombre_usuario_receptor,
            nombre_usuario_receptor: req.params.nombre_usuario_emisor
          }
        ]
      },
      order: [['fecha_envio', 'DESC']]

    });
    res.json( chats );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getMessage = async ( req, res ) => {

  try {

    const chat = await ChatModel.findAll({
      where: { id: req.params.id }
    });
    res.json( chat );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getMessageByUser = async ( req, res ) => {

  try {

    const chat = await ChatModel.findAll({
      where: { nombre_usuario_emisor: req.params.nombre_usuario_emisor,
                nombre_usuario_receptor: req.params.nombre_usuario_receptor }
    });
    res.json( chat );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getMessageByUserByEntry = async ( req, res ) => {
  
  try{

    const Chat = await db.query(`SELECT c.* FROM Chats c where c.mensaje != 'null' and (c.nombre_usuario_emisor like '%${req.params.buscar}%' or c.nombre_usuario_receptor like '%${req.params.buscar}%' or c.mensaje like '%${req.params.buscar}%') and (c.nombre_usuario_emisor = '${req.params.nombre_user}' or c.nombre_usuario_receptor = '${req.params.nombre_user}' or (c.id_grupo_receptor in (SELECT p.id_grupo From ParticipantesGrupos p, Usuarios u where p.nombre_usuario=u.nombre and u.nombre='${req.params.nombre_user}')));`, { type: Sequelize.QueryTypes.SELECT });
    res.json( Chat );

  } catch ( error ) {

    res.json({ message: error.message });

  }

}

const createMessage = async ( req, res ) => {

  try {

    await ChatModel.create( req.body );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const updateMessage = async ( req, res ) => {

  try {

    await ChatModel.update( req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: '¡Registro actualizado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const deleteMessage = async ( req, res ) => {

  try {

    await ChatModel.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: '¡Registro borrado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

module.exports = { getAllMessages, getAllMessagesOfOnePerson, getAllMessagesOfOnePersonOrderByDate, getAllMessagesOrderByDate, getMessage, getMessageByUser, getMessageByUserByEntry, createMessage, updateMessage, deleteMessage };
