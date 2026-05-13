import Journal from "../mocks/journalMock.js";

export const createJournal = async (req, res, next) => {
  try { const journal = await Journal.create(req.body); res.status(201).json({ success: true, data: journal }); }
  catch (err) { next(err); }
};

export const getJournals = async (req, res, next) => {
  try { const data = await Journal.find(); res.status(200).json({ success: true, data }); }
  catch (err) { next(err); }
};