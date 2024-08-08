const mongoose = require("mongoose");
const model = require("../models/model");

//  post: http://localhost:8080/api/categories
async function create_Categories(req, res) {
  const Create = new model.Categories({
    type: "Expense",
    color: "#C43095",
  });

  await Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  });
}

//  get: http://localhost:8080/api/categories
async function get_Categories(req, res) {
  let data = await model.Categories.find({});
  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
}

//  get: http://localhost:8080/api/labels

async function get_Labels(req, res) {
  const userId = req.user.id;

  try {
    const result = await model.Transaction.aggregate([
      // Match transactions for the current user
      {
        $match: { user: mongoose.Types.ObjectId(userId) }, // Ensure userId is an ObjectId
      },
      // Join with categories collection
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          as: "categories_info",
        },
      },
      // Unwind categories_info to separate documents
      {
        $unwind: "$categories_info",
      },
    ]);

    // Map result to desired format
    const data = result.map((v) => ({
      _id: v._id,
      name: v.name,
      type: v.type,
      amount: v.amount,
      color: v.categories_info.color,
    }));

    res.json(data);
  } catch (error) {
    console.error(`Error fetching labels: ${error.message}`);
    res.status(400).json({ message: "Lookup collection error" });
  }
}

async function create_Transaction(req, res) {
  const userId = req.user.id; // Get the user ID from the token
  const { name, type, amount } = req.body;

  if (!name || !type || amount === undefined) {
    return res
      .status(400)
      .json({ message: "Name, type, and amount are required" });
  }

  const newTransaction = new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
    user: userId,
  });

  try {
    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
  } catch (err) {
    res
      .status(400)
      .json({ message: `Error while creating transaction: ${err.message}` });
  }
}

// Get all transactions for the logged-in user
// GET: http://localhost:8080/api/transaction
async function get_Transaction(req, res) {
  const userId = req.user.id;

  try {
    const transactions = await model.Transaction.find({ user: userId });
    res.json(transactions);
  } catch (err) {
    res
      .status(400)
      .json({ message: `Error while fetching transactions: ${err.message}` });
  }
}

// Delete a transaction for the logged-in user
// DELETE: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
  const userId = req.user.id; // Get the user ID from the token
  const { _id } = req.body;

  if (!_id)
    return res.status(400).json({ message: "Transaction ID not provided" });

  try {
    const transaction = await model.Transaction.findOne({ _id, user: userId });

    if (!transaction)
      return res
        .status(404)
        .json({ message: "Transaction not found or not authorized" });

    await model.Transaction.deleteOne({ _id, user: userId });
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: `Error while deleting transaction: ${err.message}` });
  }
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
};
