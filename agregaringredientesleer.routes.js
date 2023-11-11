import { Router } from "express"
import { readFile, writeFile  } from 'fs/promises' 

/* RUTAS DE USUARIOS */

const fileUsers = await readFile('./ingredientes.json', 'utf-8') 
const userData = JSON.parse(fileUsers) 

const router = Router()

router.post('/ingredientes/:nombre', (req, res)=>{
    const ingr = req.params.nombre
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




router.get('/ingredientes/:nombre', (req, res)=>{
    const ingr = req.params.nombre
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

  router.post('/ingredientesPost', (req, res)=>{
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


  //ELIMINAR INGREDIENTE
  router.delete('/delete/:UserID', (req, res)=>{
    const UserID= req.params.id
    
    try{
        const index = userData.findIndex(e => e.id == UserID)
        if(index !== -1){
            userData.splice(index,1)
            writeFile('./ingredientes.json', JSON.stringify(userData,null,2 ));    
            res.status(200).json('Usuario Eliminado')
        } else {
            res.send(400).json('No se encontro el usuario')
        }
    } catch(error){     
        res.send(500).json('Error al eliminar el usuario')
    }
})
export default router
