import { withAuth } from 'lib/auth/withAuth';
import { reorderNotes } from './reorderNotes';

export const POST = withAuth(reorderNotes);

