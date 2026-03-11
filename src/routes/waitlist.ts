import { Router } from 'express';
import { WaitlistController } from '@/controllers/waitlist';
import { supabase } from '@/lib/supabase';
import { WaitlistRepository } from '@/repositories/waitlist';
import { WaitlistService } from '@/services/waitlist';
import { MethodNotAllowed } from '@/utils/errors';
import { ApiResponse } from '@/utils/response';

const router = Router();
const response = new ApiResponse();

const repository = new WaitlistRepository(supabase);
const service = new WaitlistService(repository);
const controller = new WaitlistController(service);

router.post('/v1/waitlist', (req, res) => controller.joinWaitlist(req, res));
router.all('/v1/waitlist', (_req, res) => {
  response.sendError(
    res,
    new MethodNotAllowed('HTTP method not allowed for this endpoint'),
  );
});

export default router;
