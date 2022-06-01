export const getGrupo = ( id, myGroups ) => {

  let grupo = {};

  myGroups.forEach( ( group ) => {

    if ( group.id === id ) {

      grupo = group;

    }

  });

  return grupo;

};
