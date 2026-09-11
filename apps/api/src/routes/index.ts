import { Router } from 'express';
import auth from './auth.routes';
import profile from './profile.routes';
import posts from './post.routes';
import filters from './filter.routes';
import admin from './admin.routes';
import { sendSuccess } from '../utils/response';

const api = Router();
api.get('/health', (_req, res) => sendSuccess(res, { status: 'ok', time: new Date().toISOString() }));
api.use('/auth', auth);
api.use('/profile', profile);
api.use('/posts', posts);
api.use('/filters', filters);
api.use('/admin', admin);
export default api;
