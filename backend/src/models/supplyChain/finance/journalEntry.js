const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  tenantId: mongoose.Schema.Types.ObjectId,
  entries: [
    {
      account: String,
      debit: Number,
      credit: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("JournalEntry", journalSchema);