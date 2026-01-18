// src/core/base.model.js
import { Model } from 'objection';
import { getDb } from '../config/db.config.js';

// Pasang koneksi Objection.js
Model.knex(getDb());

export class BaseModel extends Model {}
