
const Booking =require('../model/detailsbooking');
const Contact =require('../model/detailscontact');

const express = require('express');
const links = express.Router();
const routes = [
    { name: 'Welcome', url: '/' },
    { name: 'Booking', url: '/booking' },
    { name: 'Staff', url: '/staff_login' },
    { name: 'Contact Us', url: '/contact_us' },
]; // Used for the dynamic rendering

links.get('/', (req, res) =>{
    res.render('welcome', {routes});
});

links.get('/booking', async (req, res) =>{
    res.render('booking', {routes});
});

links.get('/bookings', async (req, res) => {
    try {

        const bookings = await Booking.find(); // Get the list of bookings on the system
  
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error fetching bookings', error });
    }
  });


links.post('/booking',  async (req,res) => {
    try
        {
            const {day, email, name} = req.body;

            const bookingCount = await Booking.countDocuments({ day });
            if (bookingCount >= 50) {
                return res.status(400).json({ message: 'This day is fully booked.' });
            }// denies booking if there are more than 50 bookings on the day

            const existingBooking = await Booking.findOne({ day, email }); 
            if (existingBooking) {
                return res.status(400).json({ message: 'You have already booked for this day.' });
            } // to look if the actual booking is existing

            const newBooking = new Booking ({
                day, email, name
            });

            await newBooking.save();
        
        res.status(201).json({ message: 'Booking successful!', Booking: newBooking });
    } catch (error) {
      console.log('Error saving booking:', error);
     res.status(500).json({ message: 'Error saving booking', error });
    }
    
    
});

links.get('/staff_login', (req, res) =>{
    res.render('staff', {routes});
});

links.get('/contact_us', (req, res) =>{
    res.render('contact_us', {routes});
});


links.post('/contact', async (req, res) => {
    try{
        const {name, email, message} = req.body;

        const newContact = new Contact({
            name, email, message
        });

        await newContact.save();

        res.status(201).json({message: 'Message sent',
            Details : newContact
        });
    }
    catch(err){
        console.log('err', err);
        res.status(500).json();
    }
});


module.exports = links;