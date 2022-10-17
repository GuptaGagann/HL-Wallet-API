const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
mongoose.connect('mongodb+srv://CarsEnterprizesByGagan:Gamma0722@cluster0.jjr3qd9.mongodb.net/HighLevelWallet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB connection successful!'));

var connection = mongoose.createConnection('mongodb+srv://CarsEnterprizesByGagan:Gamma0722@cluster0.jjr3qd9.mongodb.net/HighLevelWallet');
autoIncrement.initialize(connection);

// Wallet Modal Schema
const walletSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Required field']
        },
        balance: {
            type: Number,
            required: [true, 'Required field']
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);

// Transaction Modal Schema
const transactionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, 'Required field']
        },
        amount: {
            type: Number,
            required: [true, 'Required field']
        },
        balance: {
            type: Number,
            required: [true, 'Required field']
        },
        walletId: {
            type: Number,
            required: [true, 'Required field']
        },
        description: {
            type: String
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);

walletSchema.plugin(autoIncrement.plugin, { model: 'wallet', field: 'id', startAt: 100, incrementBy: 1 });
transactionSchema.plugin(autoIncrement.plugin, { model: 'transaction', field: 'id', startAt: 1000, incrementBy: 1 });

// Creating model objects
const Wallet = mongoose.model('wallets', walletSchema);
const Transaction = mongoose.model('transactions', transactionSchema);
  
// Exporting models
module.exports = {
    Wallet, Transaction
}