const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017"; 
const dbName = "Stir"; 

async function insertIntoDb(data) {
  let conn;

  try {
  
    conn = await MongoClient.connect(url);
    console.log("Connection established successfully");

    
    const db = conn.db(dbName);

 
    const collection = db.collection("trends"); 

    const trendData = {
      uniqueID: data["uid"], 
      trend1: data["0"],
      trend2: data["1"],
      trend3: data["2"],
      trend4: data["3"],
      trend5: data["4"],
      endTime: data["date"], 
      ipAddress: data["ip"],
    };


    const result = await collection.insertOne(trendData);
    console.log(`Data inserted with _id: ${result.insertedId}`);

  } catch (err) {
    console.error("Error connecting to MongoDB or inserting data", err);
  } finally {
    if (conn) {
      await conn.close();
      console.log("MongoDB connection closed");
    }
  }
}


async function fetchfromDatabase(id){
  let conn;

  try {
  
    conn = await MongoClient.connect(url);
    const db = conn.db(dbName);
    const collection = db.collection("trends"); 

    const result = await collection.findOne({ uniqueID: id });
    console.log("The result is ",result);
    return result;

  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data", err);
  } finally {
    if (conn) {
      await conn.close();
      console.log("MongoDB connection closed");
    }
  }
}

module.exports = {insertIntoDb,fetchfromDatabase};

