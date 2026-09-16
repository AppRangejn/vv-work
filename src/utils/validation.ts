export interface FormValidationData {
  name: string;
  contact?: string;
  message?: string;
}

export interface FormValidationErrors {
  name?: string;
  contact?: string;
  message?: string;
}

export function validateApplicationForm(
  data: FormValidationData,
  translations: { nameError: string; contactError: string; messageError: string }
): { isValid: boolean; errors: FormValidationErrors } {
  const errors: FormValidationErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = translations.nameError;
  }

  const trimmedContact = data.contact ? data.contact.trim() : '';
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
  const telegramRegex = /^@[a-zA-Z0-9_]{4,32}$/;

  if (!phoneRegex.test(trimmedContact) && !telegramRegex.test(trimmedContact)) {
    errors.contact = translations.contactError;
  }

  if (data.message && data.message.length > 500) {
    errors.message = translations.messageError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}