const { Wallet, Transaction } = require("../Model/highLevelWalletSchema");
exports.setup = async (req, res) => {
  console.log("setup request", req.body);
  try {
    const walletSetup = await Wallet.create(req.body);
    res.status(201).json({
      status: "created",
      data: {
        walletSetup,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Encountered an error while setting up the wallet.",
      error: err
    });
  }
};

exports.transact = async (req, res) => {
  console.log("transact request", req.body);
  try {
    const walletUpdate = await Wallet.findOneAndUpdate(
      { id: Number(req.params.walletId) },
      { $inc: { balance: req.body.amount ? req.body.amount : 0 } },
      {
        runValidators: true,
      }
    );
    if (walletUpdate != null) {
      console.log(walletUpdate);
      req.body["walletId"] = req.params.walletId;
      req.body["balance"] = walletUpdate.balance + req.body.amount;
      const transactionEntry = await Transaction.create(req.body);
      if (transactionEntry) {
        res.status(201).json({
          status: "created",
          data: {
            transactionEntry,
          },
        });
      } else {
        res.status(400).json({
          status: "error",
          message: `Error registering transaction for wallet ID ${req.params.walletId}`,
          error: `Error registering transaction for wallet ID ${req.params.walletId}`
        });
      }
    } else {
      res.status(404).json({
        status: "not found",
        message: "Please setup a wallet before start transacting!",
        data: {
          message: `No wallets found for ID ${req.params.walletId}`,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Encountered an error while transacting from the wallet.",
      error: err
    });
  }
};

exports.transactions = async (req, res) => {
  console.log("transactions request", req.query);
  try {
    let transactions = [];
    if (req.query.walletId) {
      transactions = await Transaction.find(
        { walletId: req.query.walletId },
        { _id: 0, __v: 0 },
        { skip: req.query.skip, limit: req.query.limit }
      );
    } else {
      transactions = await Transaction.find(
        {},
        { _id: 0, __v: 0 },
        { skip: req.query.skip, limit: req.query.limit }
      );
    }
    if (transactions.length > 0) {
      res.status(200).json({
        status: "success",
        results: transactions.length,
        data: {
          transactions,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
        message: `No more transactions found.`,
        data: {
          message: `No more transactions are available in the database for Wallet ID ${req.query.walletId}.`,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: `Encountered an error while fetching the transactions for Wallet ID ${req.query.walletId}.`,
      error: err
    });
  }
};

exports.walletDetails = async (req, res) => {
  console.log("walletDetails request", req.params);
  try {
    const walletEntry = await Wallet.findOne(
      { id: req.params.id },
      { _id: 0, transactions: 0, __v: 0 }
    );
    if (walletEntry != null) {
      res.status(200).json({
        status: "success",
        data: {
          walletEntry,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
        message: `No entry found in the database for Wallet ID ${req.query.walletId}.`,
        data: {
          message: `No entry found in the database for Wallet ID ${req.query.walletId}.`,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: `Encountered an error while fetching the details for Wallet ID ${req.query.walletId}.`,
      error: err
    });
  }
};
