import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';
import { submitApplication, type ContactFormData } from '../services/api';
import { validateApplicationForm, type FormValidationErrors } from '../utils/validation';


function ContactsPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const isEmployer = searchParams.get('role') === 'employer';

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    contact: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
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
    setErrors({});
    setSubmitError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validationResult = validateApplicationForm(formData, t);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitApplication(formData);
      setIsSuccess(true);
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
    <div className="w-full bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            {isEmployer ? t.employerContactsTitle : t.contactsTitle}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {isEmployer ? t.employerSubtitle : t.candidateSubtitle}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-2xs">
          <div
            role="tablist"
            aria-label="Target audience selector"
            className="mb-7 flex rounded-xl bg-zinc-100 p-1 text-xs font-bold sm:text-sm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isEmployer}
              onClick={() => setRole('candidate')}
              className={`flex-1 rounded-lg py-2.5 text-center transition-all cursor-pointer ${
                !isEmployer
                  ? 'bg-white text-blue-600 shadow-xs font-extrabold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {t.forCandidates}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isEmployer}
              onClick={() => setRole('employer')}
              className={`flex-1 rounded-lg py-2.5 text-center transition-all cursor-pointer ${
                isEmployer
                  ? 'bg-white text-blue-600 shadow-xs font-extrabold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {t.forEmployers}
            </button>
          </div>

          {isSuccess && !submitError ? (
            <div className="py-8 text-center" role="status">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600" aria-hidden="true">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-zinc-900">{t.successMsg}</h2>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-blue-700 active:scale-[0.99] cursor-pointer"
              >
                {t.sendAnotherBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {submitError && (
                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                  {submitError}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-name" className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  {isEmployer ? t.employerNameLabel : t.nameLabel} <span className="text-blue-600">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3.5 text-zinc-400" aria-hidden="true">
                    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    id="form-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder={isEmployer ? t.employerNamePlaceholder : t.candidateNamePlaceholder}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition ${
                      errors.name
                        ? 'border-red-500 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                        : 'border-zinc-200 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                    }`}
                  />
                </div>
                {errors.name && (
                  <span id="name-error" role="alert" className="text-xs font-medium text-red-600">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-contact" className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  {t.contactLabel} <span className="text-blue-600">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3.5 text-zinc-400" aria-hidden="true">
                    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <input
                    id="form-contact"
                    name="contact"
                    type="text"
                    placeholder={t.contactPlaceholder}
                    value={formData.contact}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, contact: e.target.value }));
                      if (errors.contact) setErrors((prev) => ({ ...prev, contact: '' }));
                    }}
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? 'contact-error' : undefined}
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition ${
                      errors.contact
                        ? 'border-red-500 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                        : 'border-zinc-200 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                    }`}
                  />
                </div>
                {errors.contact && (
                  <span id="contact-error" role="alert" className="text-xs font-medium text-red-600">
                    {errors.contact}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between text-xs">
                  <label htmlFor="form-message" className="font-bold uppercase tracking-wider text-zinc-800">
                    {isEmployer ? t.employerMessageLabel : t.candidateMessageLabel}
                  </label>
                  <span className={`font-mono text-[11px] ${formData.message && formData.message.length > 500 ? 'text-red-600 font-bold' : 'text-zinc-400'}`}>
                    {(formData.message || '').length}/500
                  </span>
                </div>
                <textarea
                  id="form-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  placeholder={isEmployer ? t.employerMessagePlaceholder : t.candidateMessagePlaceholder}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, message: e.target.value }));
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full resize-y rounded-lg border p-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition min-h-[110px] ${
                    errors.message
                      ? 'border-red-500 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                      : 'border-zinc-200 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                  }`}
                />
                {errors.message && (
                  <span id="message-error" role="alert" className="text-xs font-medium text-red-600">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-lg bg-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-blue-700 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t.submittingBtn}
                  </span>
                ) : (
                  isEmployer ? t.employerSubmitBtn : t.submitBtn
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactsPage;