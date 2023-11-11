import { Router } from "express"
import { readFile, writeFile  } from 'fs/promises' 

/* RUTAS DE USUARIOS */

const fileUsers = await readFile('./recetas.json', 'utf-8') 
const userData = JSON.parse(fileUsers) 

const router = Router()


router.get('/Recetas/:id', (req, res)=>{
    const Rec = req.params.nombre
    const result = userData.find(e => e.id === Rec) 
    try{
        if(result){
            res.status(200).json('Ingrediente encontrado')
        } else {
            res.status(400).json('No se encontro el ingrediente')
        }
    } catch(error){     
        res.send(500).json('Error al buscar el ingrediente')
   }
  })    

  router.post('/RecetasPost', (req, res)=>{
    const ingr = req.body.nombre
    const result = userData.find(e => e.nombre === ingr) 
    try{
        if(result){
            res.status(200).json('Ingrediente encontrado')
        } else {
            res.status(400).json('No se encontro el ingrediente')
        }
    } catch(error){     
        res.send(500).json('Error al buscar el ingrediente')
   }
  })

  router.delete('/delete/:UserID', (req, res)=>{
    const UserID= req.params.id
    
    try{
        const index = userData.findIndex(e => e.id == UserID)
        if(index !== -1){
            userData.splice(index,1)
            writeFile('./recetas.json', JSON.stringify(userData,null,2 ));    
            res.status(200).json('Usuario Eliminado')
        } else {
            res.send(400).json('No se encontro el usuario')
        }
    } catch(error){     
        res.send(500).json('Error al eliminar el usuario')
    }
})
export default router
