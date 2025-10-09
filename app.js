const express = require('express');

const connectionDB = require('./src/config');
const {validate} = require('./src/utiltys/validation')
const Model = require('./src/models/schema.js')
const bcrypt = require('bcrypt')
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const { user_auth } = require('./src/middleware/auth.js');

const app = express();

const port = 3000;

app.use(express.json());
app.use(cookieparser());




  connectionDB().then(() => {
          console.log("Database connected successfully");
    
    
    
          app.listen(port, () => {
        
            console.log(`Server is running on http://localhost:${port}`);
   
          });

        }).catch((err) => {
   
          console.log("Database connection failed", err);

        });
