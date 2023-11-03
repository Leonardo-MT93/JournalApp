
export const fileUpload = async(file) => {
    if(!file) throw new Error('No hay archivos para subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/djsiviw7j/image/upload';

    const formData = new FormData();

    formData.append('upload_preset', 'journalApp');
    formData.append('file', file);


    try {

        const resp = await fetch (cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(!resp.ok) throw new Error('No se pudieron subir las imágenes')
        const cloudResponce = await resp.json();
        return cloudResponce.secure_url


    } catch (error) {
        throw new Error(error.message);
    }



}