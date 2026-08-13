const questService = require('../services/questService');

function listQuests(req, res) {
  res.json(questService.getAllQuests());
}

function completeQuest(req, res, next) {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const result = questService.completeQuest({ userId, questId: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { listQuests, completeQuest };
