'use strict';

const db = require('../models/index.models');
const api = require('../api/api');

exports.sourceLikeOrFavory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reqBody = {
      type: req.body.type,
      sourceId: req.params.sourceId,
    };

    const sourceId = await getByIdApi(reqBody.type, reqBody.sourceId);
    if (!sourceId) {
      return res.status(404).json({ message: 'data not existing' });
    }

    let source = await db.source.findOne({ sourceId: reqBody.sourceId });
    if (!source) {
      source = await createSource(reqBody);
    }
    if (req.body.like !== undefined) {
      source = await sourceOptionUpdate(source, 'likes', req.body.like, userId);
    }
    if (req.body.favory !== undefined) {
      source = await sourceOptionUpdate(source, 'favory', req.body.favory, userId);
    }
    return res.status(200).json(source);
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.getBySourceId = async (req, res) => {
  try {
    const source = await db.source.findOne({ sourceId: req.params.sourceId });
    return res.status(200).json(source);
  } catch (e) {
    return res.status(500).json(e);
  }
};

async function createSource(reqSource) {
  const source = new db.source(reqSource);
  return await source.save();
}

async function getByIdApi(type, id) {
  let source;
  switch (type) {
    case 'movie':
      source = await api.movie.getById(id);
      break;
    case 'tv':
      source = await api.tv.getById(id);
      break;
    default:
      console.log('Incorrect entry');
  }
  return source;
}

// Modifies the select option according to its type, and return the source edit.

async function sourceOptionUpdate(source, typeOption, optionUpdate, userId) {
  switch (typeOption) {
    case 'likes':
      if (optionUpdate === '1' && source.usersLiked.includes(userId) !== true) {
        await db.source.updateOne(
          { _id: source._id },
          {
            $inc: { likes: optionUpdate++ },
            $push: { usersLiked: userId },
          }
        );
      } else {
        await db.source.updateOne(
          { _id: source._id },
          {
            $pull: { usersLiked: userId },
            $inc: { likes: -1 },
          }
        );
      }
      break;
    case 'favory':
      if (optionUpdate === '1' && source.usersFavorites.includes(userId) !== true) {
        await db.source.updateOne(
          { _id: source._id },
          {
            $push: { usersFavorites: userId },
          }
        );
      } else {
        await db.source.updateOne(
          { _id: source._id },
          {
            $pull: { usersFavorites: userId },
          }
        );
      }
      break;
    default:
      console.log('Incorrect entry');
  }
  return await db.source.findOne({ sourceId: source.sourceId });
}
