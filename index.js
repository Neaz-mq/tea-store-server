const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000;

// MIDDLEWARE

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0zyo6s3.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const teaCollection = client.db('teaDB').collection('tea');
    const userCollection = client.db('teaDB').collection('user');


    app.get('/tea', async (req, res) => {
      const cursor = teaCollection.find();
      const result = await cursor.toArray();
      res.send(result);

    })

    app.post('/tea', async (req, res) => {

      const newTea = req.body;
      console.log(newTea);

      const result = await teaCollection.insertOne(newTea);
      res.send(result);

    })

    app.delete('/tea/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await teaCollection.deleteOne(query);
      res.send(result);
    })


    app.get('/tea/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await teaCollection.findOne(query);
      res.send(result);


    })


    app.put('/tea/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatedTea = req.body;
      const tea = {
        $set: {
          name: updatedTea.name,
          quantity: updatedTea.quantity,
          supplier: updatedTea.supplier,
          taste: updatedTea.taste,
          category: updatedTea.category,
          details: updatedTea.details,
          photo: updatedTea.photo
        },
      }
      const result = await teaCollection.updateOne(filter, tea, options);
      res.send(result);

    })


    // user related apis

    app.post('/user', async(req, res) =>{
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
  })



    // Send a ping to confirm a successful connection

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Tea making server is running')
})

app.listen(port, () => {
  console.log(`Tea Server is running on port: ${port}`);
})