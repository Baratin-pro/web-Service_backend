'use strict';

const api = require('../api/api');

exports.getTv = async (req, res) => {
  try {
    const apiGetTv = await api.tv.getById(req.params.id);
    return res.status(200).json(apiGetTv);
  } catch (e) {
    return res.status(500).json(e);
  }
};
