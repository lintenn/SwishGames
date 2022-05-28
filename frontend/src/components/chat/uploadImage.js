export const uploadImage = async ( file ) => {

  const formData = new FormData();
  formData.append( 'file', file[0]);
  formData.append( 'upload_preset', 'FotosGrupos' );
  const res = await fetch(
    'https://api.cloudinary.com/v1_1/duvhgityi/image/upload',
    {
      method: 'POST',
      body: formData
    }
  );
  const result = await res.json();
  console.log( result );

  return result.secure_url;

};
