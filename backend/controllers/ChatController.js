const ChatModel = require( '../models/ChatModel.js' );
const { Op, Sequelize } = require( 'sequelize' );
const db = require("../database/mysql.js")

const getAllMessages = async ( req, res ) => {

  try {

    const Chat = await db.query(`SELECT c.* FROM Chats c where (c.nombre_usuario_emisor = '${req.params.nombre_user}' or c.nombre_usuario_receptor = '${req.params.nombre_user}' or (c.id_grupo_receptor in (SELECT p.id_grupo From ParticipantesGrupos p, Usuarios u where p.nombre_usuario=u.nombre and u.nombre='${req.params.nombre_user}')));`, { type: Sequelize.QueryTypes.SELECT });
    res.json( Chat );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getAllMessagesOrderByDate = async ( req, res ) => {

  try {

    const Chat = await db.query(`SELECT c.* FROM Chats c where (c.nombre_usuario_emisor = '${req.params.nombre_user}' or c.nombre_usuario_receptor = '${req.params.nombre_user}' or (c.id_grupo_receptor in (SELECT p.id_grupo From ParticipantesGrupos p, Usuarios u where p.nombre_usuario=u.nombre and u.nombre='${req.params.nombre_user}'))) order by fecha_envio desc;`, { type: Sequelize.QueryTypes.SELECT });
    res.json( Chat );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getMessageByUserByEntry = async ( req, res ) => {
  
  try{

    const Chat = await db.query(`SELECT c.* FROM Chats c where c.mensaje != 'null' and c.administracion != 1 and (c.mensaje like '%${req.body.buscar}%') and (c.nombre_usuario_emisor = '${req.body.nombre_user}' or c.nombre_usuario_receptor = '${req.body.nombre_user}' or (c.id_grupo_receptor in (SELECT p.id_grupo From ParticipantesGrupos p, Usuarios u where p.nombre_usuario=u.nombre and u.nombre='${req.body.nombre_user}')));`, { type: Sequelize.QueryTypes.SELECT });
    res.json( Chat );

  } catch ( error ) {

    res.json({ message: error.message });

  }

}

const getMessageResponse = async (req, res) => {

  try{

    const Chat = await db.query(`SELECT c.* FROM Chats c WHERE c.respuesta = ${req.params.id_mensaje}`,  { type: Sequelize.QueryTypes.SELECT });
    res.json( Chat );

  } catch (error){

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

module.exports = { getAllMessages, getAllMessagesOrderByDate, getMessageByUserByEntry, getMessageResponse, createMessage, updateMessage, deleteMessage };
