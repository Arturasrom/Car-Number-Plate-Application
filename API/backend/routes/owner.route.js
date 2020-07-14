const express = require('express');
const app = express();
const ownerRoute = express.Router();
var respond;

// Owner model.
let Owner = require('../model/Owner');

// Add owner.
ownerRoute.route('/add-owner').post((req, res, next) => {

  //Validation. Check if car plate is available or not. If available Return error object.
  Owner.findOne({
    license_plate: req.body.license_plate
  }).then(owner => {
    if (owner) {

      respond = {
        respondId: 1,
        messageDescription: "Car plate already exists!"
      }
      res.send(respond);

    } else {

      Owner.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    }
  })

});

// Get all owners.
ownerRoute.route('/').get((req, res) => {
  Owner.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single owner.
ownerRoute.route('/read-owner/:id').get((req, res) => {
  Owner.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update owner.
ownerRoute.route('/update-owner/:id').put((req, res, next) => {

  //Validation. Check if car plate is available or not. If available Return error object.
  Owner.findOne({
    license_plate: req.body.license_plate
  }).then(owner => {
    if (owner) {

      respond = {
        respondId: 1,
        messageDescription: "Car plate already exists."
      }
      res.send(respond);

    }
    else {

      Owner.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, (error, data) => {
        if (error) {
          return next(error);
          console.log(error)
        } else {
          res.json(data)
          console.log('Car plate owner successfully updated!')
        }
      })

    }
  });

})

// Delete owner.
ownerRoute.route('/delete-owner/:id').delete((req, res, next) => {
  Owner.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = ownerRoute;