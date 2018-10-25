const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router
    // .route('/')
    // Get logged in user’s details
    .get('/',async (req, res) => {
        // console.log(req)
        let event = await global.Event.find({
            eventProposer: req.user._id
        })
            .populate('venueId')
        // console.log(event)
        res.json(event)
    })
    .post('/',async (req, res) => {
        console.log("you comed to backend api")
        console.log(req.body)
        let data=req.body.a
        console.log(req.body.a.noOfTickets)

        let newEvent=await global.Event.create({
            name:req.body.a.name,
            noOfTickets:req.body.a.noOfTickets,
            price:req.body.a.price,
            description:req.body.a.description,
            eventProposer:req.user._id,
            venueId:req.body.a.venueId
        // venueId:req.venueId.venueId
        })
        console.log("inserted!")
        console.log(newEvent)
        res.json({ test: "j" })
    })

    .delete('/:id',async (req,res)=>{
        var id=req.params.id;
        await global.Event.deleteOne({_id:Object(id)});
      
        res.json({
          works:true,
          deletedID:req.params.id
        })
      })


module.exports = router
