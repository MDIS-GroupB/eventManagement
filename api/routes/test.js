const express = require('express')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')

const venuesJson = require('../dev/venues.json')

const router = express.Router()
let venues = venuesJson

router
    .route('/all')
    // Get logged in user’s details
    .post(async (req, res) => {
        venues.forEach('/createVenues', async (key, i) => {
            console.log(key)
            if (i > 0) {
                await global.Venue.create({
                    name: key.tagline,
                    theme: key.eventType,
                    description: key.description,
                    location: key.location,
                    location: key.location,
                    image: key.image,
                })
            }
        })

        console.log(req.body)
        res.json({ test: 'works' })
    })
    .post(async (req, res) => {
        venues.forEach('/createVenues', async (key, i) => {
            if (i > 0) {
                await global.Venue.create({
                    name: key.tagline,
                    theme: key.eventType,
                    description: key.description,
                    location: key.location,
                    location: key.location,
                    image: key.image,
                })
            }
        })

        console.log(req.body)
        res.json({ test: 'works' })
    })
    .delete(async (req, res) => {
        await global.User.remove()
        await global.Venue.remove()
        await global.Event.remove()
        await global.Personal.remove()

        console.log('Collections Dropped')
        console.log(req.body)
        const user = new User({ email: 'js@gmail.com', admin: true })
        let admin = user
        await User.register(user, 'asdf', async (error) => {
            if (error) {
                console.error(error)
                next(error)
                return
            }
            req.user = user
            let bat = await global.Personal.create({
                userID: user._id,
                firstName: 'Josh',
                lastName: 'Smith',
            })

        })

        const newUser = new User({ email: 'finance@gmail.com', admin: false })
        await User.register(newUser, 'asdf', async (error) => {
            if (error) {
                console.error(error)
                next(error)
                return
            }
            req.user = newUser
            let bat = await global.Personal.create({
                userID: newUser._id,
                firstName: 'Josh',
                lastName: 'Smith',
            })

        })



        console.log('userCreated')
        let newVenues = []
        for (let i = 0; i < venues.length; i++) {
            let newVenue;
            if (i > 0) {
                newVenue = await global.Venue.create({
                    name: venues[i].tagline,
                    theme: venues[i].eventType,
                    description: venues[i].description,
                    location: venues[i].location,
                    location: venues[i].location,
                    image: venues[i].image,
                })
            }
            if (i <= 4) {
                newVenues.push(newVenue)
            }
        }
        console.log('venues created')
        console.log(newVenues)
        let newEvents = [
            {
                name: 'Fun Times',
                description: 'Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.',
                // category: {
                //   type: mongoose.Schema.Types.ObjectId,
                //   ref: 'Category',
                //   required: true,
                // },
                venueId: newVenues[1]._id,
            },
            {
                name: 'Fun Times',
                description: 'Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.',
                // category: {
                //   type: mongoose.Schema.Types.ObjectId,
                //   ref: 'Category',
                //   required: true,
                // },
                venueId: newVenues[2]._id,
                status: {
                    approved: true,
                    userId: admin._id
                },
            },
            {
                name: 'Aight Times',
                description: 'Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.Gonna be the craziest shit ever. Alesso, the beast etc.',
                // category: {
                //   type: mongoose.Schema.Types.ObjectId,
                //   ref: 'Category',
                //   required: true,
                // },
                venueId: newVenues[3]._id,
                status: {
                    approved: false,
                    userId: admin._id
                },
            }
        ]

        await global.Event.insertMany(newEvents)
        console.log('events created')

        res.send('DB made')


    })

module.exports = router
