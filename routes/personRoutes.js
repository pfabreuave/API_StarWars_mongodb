const router = require('express').Router()

const Person = require('../models/Person')

// creacion de registros en la base de datos

router.post('/', async (req, res) => {
    const { 
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
        homeworld,
        avatar } = req.body
  
  // para validar los datos de entrada
  
  if(!name) {
    res.status(422).json({error: 'nome é obrigatorio'})
    return
  }
  
  
    const person = {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
        homeworld,
        avatar
    }
  
    try {
      await Person.create(person)
  
      res.status(201).json({ message: 'Personagen inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  // busca los registro grabados en la base de datos

  router.get('/', async (req, res) => {
    try {
      const people = await Person.find()
  
      res.status(200).json(people)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  // busca un  registro determinado en la base de datos
  
  router.get('/:id', async (req, res) => {
  
    const id = req.params.id
  
    try {
      const person = await Person.findOne({ _id: id })
  
      if (!person) {
        res.status(422).json({ message: 'Personagen não encontrado!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
// Actualiza un campo o mas de un registro grabado en la base de datos
//              llamado tambien actualizacion parcial (patch)

router.patch('/:id', async (req, res) => {
    const id = req.params.id
  
    const { 
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
        homeworld,
        avatar } = req.body
  
        const person = {
                        name,
                        height,
                        mass,
                        hair_color,
                        skin_color,
                        eye_color,
                        birth_year,
                        gender,
                        homeworld,
                        avatar
        }
  
    try {
      const updatedPerson = await Person.updateOne({ _id: id }, person)
  
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'Personagen não encontrado!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })


// elimina un registro existente en la base de datos


router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const person = await Person.findOne({ _id: id })
  
    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Person.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Personagen removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  

  module.exports = router