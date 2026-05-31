import { Segments, Joi } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().trim().allow(''),
  }),
};

const objectIdValidation = (value, helpers) => {
  if (isValidObjectId(value)) {
    return value;
  }
  return helpers.message('Invalid id format');
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidation).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').trim().optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidation).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow('').trim(),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
};
