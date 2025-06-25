import Joi from 'joi';

export const employeeSchema = Joi.object({
  nama: Joi.string().min(3).required(),
  alamat: Joi.string().allow(''),
  gend: Joi.string().valid('L', 'P').required(),
  photo: Joi.string().base64().required(),
  tgl_lahir: Joi.date().required(),
  status: Joi.number().valid(0, 1).required(),
  insert_by: Joi.string().required(),
  id: Joi.number().required()
});

export const employeeUpdateSchema = Joi.object({
  nama: Joi.string().min(3).required(),
  alamat: Joi.string().allow('').optional(),
  gend: Joi.string().valid('L', 'P').required(),
  photo: Joi.string().base64().required(),
  tgl_lahir: Joi.date().required(),
  status: Joi.number().valid(0, 1).required(),
  update_by: Joi.string().required()
});

