const GroupModel = require( '../models/GroupModel.js' );
const { Op, Sequelize } = require( 'sequelize' );
const db = require("../database/mysql.js")

const getLastGroupByNameUser = async ( req, res ) => {

  try {

    const Group = await GroupModel.findAll({
      where: { nombre_creador: req.params.nombre_creador },
      order: [['fecha_creacion', 'DESC']]
    });
    res.json( Group[0] );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getGroupsAreInUser1AndUser2 = async ( req, res ) => {

  try {

    const Group = await db.query(`Select g.* from Grupos g where g.id in (Select p.id_grupo From ParticipantesGrupos p, Usuarios u where u.nombre=p.nombre_usuario and u.nombre='${req.params.nombre_usuario1}' and p.id_grupo in (Select p.id_grupo From ParticipantesGrupos p, Usuarios u where u.nombre=p.nombre_usuario and u.nombre='${req.params.nombre_usuario2}'))`);

    res.json( Group[0] );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const createGroup = async ( req, res ) => {

  try {

    await GroupModel.create( req.body );
    res.json({ message: '¡Registro creado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const updateGroup = async ( req, res ) => {

  try {

    await GroupModel.update( req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: '¡Registro actualizado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const deleteGroup = async ( req, res ) => {

  try {

    await GroupModel.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: '¡Registro borrado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

module.exports = { getLastGroupByNameUser, getGroupsAreInUser1AndUser2, createGroup, updateGroup, deleteGroup };