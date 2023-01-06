
const uploader = require("../services/multerCloud");
const { Router } = require('express');
const { uploadImage } = require('../controllers/uploadImage');

/* Date Creation: January 5, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea la ruta para el servicio para cargar imagen a cloudinary
*/

const router = Router();
router.post('/cloudinary/upload', uploader.array("files"), async (req,res,next) => {
    let images = req.files
    
  try {
    let imagesUploaded = [];
    console.log(req.files);
    //Para subir imagenes a claudinary
    await images.forEach(element => { // element es igual a cada imagen
         let imageUpload = uploadImage(element.path);  //element.path, contiene la ruta y nombre de archivo
         imagesUploaded.push(imageUpload);
         //console.log(element.path);
         
    })
    
    return res.status(200).json({"Message: " : "Carga completada: " + imagesUploaded.length + " imagen(es)."}); 
   
  } catch (error) {Message : "Límite excedido, deben ser 15 MB."}
});

module.exports = router;