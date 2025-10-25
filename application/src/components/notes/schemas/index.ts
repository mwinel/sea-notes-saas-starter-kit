import * as yup from 'yup';

/**
 * Validation schema for note forms
 */
export const noteValidationSchema = yup.object().shape({
  title: yup.string().optional(),
  content: yup.string().optional(),
  category: yup.string().optional(),
  status: yup.string().optional(),
});
