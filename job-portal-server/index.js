const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path'); // For resolving paths
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Load .env from the root

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // Import ObjectId here

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

console.log('Environment variables loaded:');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_CLUSTER:', process.env.DB_CLUSTER);
console.log('DB_NAME:', process.env.DB_NAME);

// MongoDB setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// MongoDB Connection
let jobsCollections;
async function connectToMongoDB() {
  try {
    // Connect the client to the server
    await client.connect();
    const db = client.db('mernJOBPortal');
    jobsCollections = db.collection('demoJobs');
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if connection fails
  }
}
connectToMongoDB();

// Routes

// Post a job
app.post('/post-job', async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date();
    console.log(body);
    const result = await jobsCollections.insertOne(body);
    if (result.insertedId) {
      return res.status(200).send(result);
    } else {
      return res.status(500).send({
        message: 'Cannot insert! Try again later',
        status: false,
      });
    }
  } catch (error) {
    console.error('Error posting job:', error);
    return res.status(500).send({ message: 'Internal server error', status: false });
  }
});

// Get all jobs
app.get('/all-jobs', async (req, res) => {
  try {
    const jobs = await jobsCollections.find({}).toArray();
    res.send(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).send({ message: 'Internal server error', status: false });
  }
});

//get single job using id
app.get("/all-jobs/:id", async(req, res) => {
    const id = req.params.id;
    const job = await jobsCollections.findOne( {
        _id: new ObjectId(id)
    })
    res.send(job)
})

// Get jobs by email
app.get('/myJobs/:email', async (req, res) => {
  try {
    // Remove any extraneous characters from the email parameter
    const email = decodeURIComponent(req.params.email).replace(/^:/, '').trim(); // Remove leading ":" if present
    console.log('Fetching jobs posted by:', email);

    // Query the database with a case-insensitive regular expression
    const jobs = await jobsCollections
      .find({ postedBy: { $regex: `^${email}$`, $options: 'i' } })
      .toArray();

    if (jobs.length > 0) {
      res.status(200).send(jobs);
    } else {
      console.log('No jobs found for email:', email);
      res.status(404).send({ message: 'No jobs found for this email.' });
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Delete a job
app.delete('/job/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filter = {
      _id: new ObjectId(id), // Ensure the ID is properly converted to ObjectId
    };
    const result = await jobsCollections.deleteOne(filter);
    if (result.deletedCount > 0) {
      res.status(200).send({ message: 'Job deleted successfully' });
    } else {
      res.status(404).send({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

//UPDATE A JOB

app.patch("/update-job/:id", async(req, res) => {
    const id = req.params.id;
    const jobData = req.body;
    const filter = {_id: new ObjectId(id)};
    const options = {upsert: true};
    const updateDoc = {
        $set: {
            ...jobData
        },
    };

    const result = await jobsCollections.updateOne(filter, updateDoc, options);
    res.send(result);
})

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await client.close();
  console.log('MongoDB connection closed.');
  process.exit(0);
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
