import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';
import { submitApplication } from '../services/api';

interface FormState {
  name: string;
  contact: string;
  message: string;
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

function ContactsPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const isEmployer = searchParams.get('role') === 'employer';

  const [formData, setFormData] = useState<FormState>({
    name: '',
    contact: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setRole = (role: 'candidate' | 'employer') => {
    if (role === 'employer') {
      searchParams.set('role', 'employer');
    } else {
      searchParams.delete('role');
    }
    setSearchParams(searchParams);
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (formData.name.trim().length < 2) {
      nextErrors.name = t.nameError;
    }

    const trimmedContact = formData.contact.trim();
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    const telegramRegex = /^@[a-zA-Z0-9_]{4,32}$/;

    if (!phoneRegex.test(trimmedContact) && !telegramRegex.test(trimmedContact)) {
      nextErrors.contact = t.contactError;
    }

    if (formData.message.length > 500) {
      nextErrors.message = t.messageError;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    setIsSuccess(true);

    try {
      await submitApplication(formData);
    } catch {
      setIsSuccess(false);
      setSubmitError(t.submitErrorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', contact: '', message: '' });
    setErrors({});
    setIsSuccess(false);
    setSubmitError(null);
  };

  return (
    <main className="mx-auto max-w-2xl py-8">

      <div className="mb-6 flex border">
        <button
          type="button"
          onClick={() => setRole('candidate')}
          className={`flex-1 py-2 text-center text-sm font-semibold ${
            !isEmployer ? 'bg-zinc-200' : 'bg-transparent'
          }`}
        >
          {t.forCandidates}
        </button>
        <button
          type="button"
          onClick={() => setRole('employer')}
          className={`flex-1 py-2 text-center text-sm font-semibold ${
            isEmployer ? 'bg-zinc-200' : 'bg-transparent'
          }`}
        >
          {t.forEmployers}
        </button>
      </div>

      <h1 className="mb-6 text-2xl font-bold">
        {isEmployer ? t.employerContactsTitle : t.contactsTitle}
      </h1>

      {isSuccess && !submitError ? (
        <div className="border p-6 text-center">
          <p className="font-bold">{t.successMsg}</p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 border px-4 py-2"
          >
            {t.sendAnotherBtn}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {submitError && (
            <div className="border border-red-500 p-3 text-red-600">
              {submitError}
            </div>
          )}


          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-semibold">
              {isEmployer ? t.employerNameLabel : t.nameLabel} *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-2"
            />
            {errors.name && (
              <span className="text-sm text-red-600">{errors.name}</span>
            )}
          </div>


          <div className="flex flex-col gap-1">
            <label htmlFor="contact" className="text-sm font-semibold">
              {t.contactLabel} *
            </label>
            <input
              id="contact"
              type="text"
              placeholder="+380... або @username"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="border p-2"
            />
            {errors.contact && (
              <span className="text-sm text-red-600">{errors.contact}</span>
            )}
          </div>


          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-sm">
              <label htmlFor="message" className="font-semibold">
                {t.messageLabel}
              </label>
              <span>{formData.message.length}/500</span>
            </div>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              placeholder={isEmployer ? t.employerMessagePlaceholder : ''}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="border p-2"
            />
            {errors.message && (
              <span className="text-sm text-red-600">{errors.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="border p-3 font-semibold"
          >
            {isSubmitting ? t.submittingBtn : t.submitBtn}
          </button>
        </form>
      )}
    </main>
  );
}

export default ContactsPage;