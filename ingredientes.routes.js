
import { Router } from "express"
import { readFile, writeFile  } from 'fs/promises' 

const router = Router()

const fileItems = await readFile('./ingredientes.json', 'utf-8') 
const userData = JSON.parse(fileItems) 
 


router.put('/usuario/:id', (req, res)=>{
    const id = req.params.id
    const nuevo_producto = req.body.tipo 
    try{
        const index = userData.findIndex(e => e.id == id) 
        if(index != -1){
            userData[index].tipo = nuevo_producto
            writeFile('./ingredientes.json', JSON.stringify(userData,null,2 ));
            res.status(200).json('Producto modificado')
        } else {
            res.status(400).json('No se encontro el producto')
        }

    } catch(error){     
        res.send(500).json('Error al actualizar el producto')
   }
  })
export default router
