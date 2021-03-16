var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;
const dbName = 'dailydose';
const collectionName = 'blogs';
const jwt = require('../jwt');
const ObjectId = require('mongodb').ObjectID;
const mongourl = '';


router.get('/', function (req, res, next) {
  try {
    const client = new mongo(process.env.DB_URL || mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(async (err) => {
      const db = await client.db(dbName);
      const blogs = await db.collection(collectionName).find({}).toArray();
      console.log(blogs);
      res.json({ blogs, statusCode: 200 });
      client.close();
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/me', [jwt.authenticate], function (req, res, next) {
  const user = req.body.auth;
  console.log('me api');
  try {
    const client = new mongo(process.env.DB_URL || mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(async (err) => {
      const db = await client.db(dbName);
      const blogs = await db.collection(collectionName).find({ email: user.email }).toArray();
      console.log(blogs);
      client.close();
      res.json({ blogs, statusCode: 200 });
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', function (req, res, next) {
  try {
    const client = new mongo(process.env.DB_URL || mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(async (err) => {
      const db = await client.db(dbName);
      const blogs = await db.collection(collectionName).findOne({ _id: new ObjectId(req.params.id) });
      console.log(blogs);
      res.json({ blogs, statusCode: 200 });
      client.close();
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/create-blog', [jwt.authenticate], function (req, res, next) {
  const user = req.body.auth;
  try {
    const client = new mongo(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(async (err) => {
      const db = await client.db(dbName);
      const record = await db.collection(collectionName).insertOne({ header: req.body.header, content: req.body.content, tags: req.body.tags, email: user.email, name: user.name, date: req.body.date });
      client.close();
      res.json({ message: 'You blog has been published successfully', statusCode: 200 });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
