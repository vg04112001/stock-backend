const Stock = require("../models/stockModel");

// Create Stock
exports.createStock = async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Stocks with Search and Sorting
// exports.getStocks = async (req, res) => {
//   try {
//     const { search, sort } = req.query;

//     // Create a query object based on the search term
//     const query = search ? { name: new RegExp(search, "i") } : {};

//     // Execute the query and conditionally apply sorting if sort parameter is present
//     let stocks;
//     if (sort) {
//       stocks = await Stock.find(query).sort(sort);
//     } else {
//       stocks = await Stock.find(query); // No sorting if sort param is not provided
//     }

//     res.status(200).json(stocks.reverse()); // Reverse for descending order
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

exports.getStocks = async (req, res) => {
  try {
    const { search, sort, startDate, endDate } = req.query;

    // Build the query object
    let query = {};

    // Apply search filter if search term is provided
    if (search) {
      query.name = new RegExp(search, "i"); // Case-insensitive search by name
    }

    // Apply date range filter if startDate and endDate are provided
    if (startDate && endDate) {
      query.expiryDate = {
        $gte: new Date(startDate), // Greater than or equal to startDate
        $lte: new Date(endDate), // Less than or equal to endDate
      };
    }

    // Execute the query with optional sorting
    let stocks;
    if (sort) {
      stocks = await Stock.find(query).sort(sort); // Sort by field (e.g., 'name', 'price', etc.)
    } else {
      stocks = await Stock.find(query); // No sorting applied if no sort parameter
    }

    res.status(200).json(stocks.reverse()); // Reverse for descending order (optional)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Single Stock
exports.getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Stock
exports.updateStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Stock
exports.deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.status(200).json({ message: "Stock deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
