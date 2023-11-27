// // const express=require('express')
import express from "express"
const app = express()
app.use(express.json())

 

const rooms = [];
const bookings = [];


 
// 1. Create a Room
app.post('/rooms', (req, res) => {
  try {
    const { name, seats, amenities, pricePerHour } = req.body;
    const room = {
      id: rooms.length + 1,
      name,
      seats,
      amenities,
      pricePerHour,
    };
    rooms.push(room);
    res.send(room);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//  2.Create room booking
app.post('/bookings',(req,res)=>{
  const data=req.body
  const data1=bookings.filter(f=>f.date==data.date)
   const data3=bookings.filter(f=>f.startTime==data.startTime)
 try {
  if(data1.length===0){
  
    if( data3.length===0){
      
    
   bookings.push(data)
res.status(201).send({message:"successfully created rooms",bookings})
}else{res.send({message:"time exist change the starttime please"})
} 
}
else{
res.status(400).send({message:"date already exits"})}
 } catch (error) {
  res.status(400).send({error:error.message})
 }
 
})
// 3. List all Rooms with Booked Data
app.get('/rooms/bookings', (req, res) => {
  try {
    const roomsWithBookings = rooms.map((room) => {
      const bookedStatus = bookings.some((booking) => booking.roomId === room.id);
      return {
        roomName: room.name,
        bookedStatus,
        customerName: bookedStatus ? bookings.find((b) => b.roomId === room.id).customerName : null,
        date: bookedStatus ? bookings.find((b) => b.roomId === room.id).date : null,
        startTime: bookedStatus ? bookings.find((b) => b.roomId === room.id).startTime : null,
        endTime: bookedStatus ? bookings.find((b) => b.roomId === room.id).endTime : null,
      };
    });
    res.send(roomsWithBookings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// 4. List all customers with booked Data
app.get('/customers/bookings', (req, res) => {
  try {
    const customersWithBookings = bookings.map((booking) => {
      const room = rooms.find((r) => r.id === booking.roomId);
      return {
        customerName: booking.customerName,
        roomName: room ? room.name : null,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
      };
    });
    res.json(customersWithBookings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// 5. List how many times a customer has booked the room
app.get('/customers/:customerName/bookings', (req, res) => {
  try {
    const { customerName } = req.params;
    const customerBookings = bookings.filter((booking) => booking.customerName === customerName);
    const bookingsWithDetails = customerBookings.map((booking) => {
      const room = rooms.find((r) => r.id === booking.roomId);
      return {
        customerName: booking.customerName,
        roomName: room ? room.name : null,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.id,
        bookingDate: booking.bookingDate,
      };
    });
    res.send(bookingsWithDetails);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.listen(7000,()=>console.log(`server listening port is 7000 `))
