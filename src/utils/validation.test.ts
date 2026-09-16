import { describe, it, expect } from 'vitest';
import { validateApplicationForm } from './validation';

const mockTranslations = {
  nameError: "Ім'я має містити мінімум 2 символи",
  contactError: 'Введіть коректний номер або @username',
  messageError: 'Максимум 500 символів',
};

describe('validateApplicationForm', () => {
  it('проходить валідацію з коректними даними (телефон)', () => {
    const result = validateApplicationForm(
      { name: 'Олександр', contact: '+380501234567', message: 'Добрий день' },
      mockTranslations
    );
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('проходить валідацію з коректним Telegram username', () => {
    const result = validateApplicationForm(
      { name: 'Іван', contact: '@ivan_dev' },
      mockTranslations
    );
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('повертає помилку, якщо імʼя менше 2 символів або складається з пробілів', () => {
    const emptyResult = validateApplicationForm(
      { name: '  ', contact: '+380501234567' },
      mockTranslations
    );
    expect(emptyResult.isValid).toBe(false);
    expect(emptyResult.errors.name).toBe(mockTranslations.nameError);

    const oneCharResult = validateApplicationForm(
      { name: 'A', contact: '+380501234567' },
      mockTranslations
    );
    expect(oneCharResult.isValid).toBe(false);
    expect(oneCharResult.errors.name).toBe(mockTranslations.nameError);
  });

  it('відхиляє невалідні формати контактів', () => {
    const invalidContacts = ['123', 'invalid-email', '@a', '@', '++38050'];

    invalidContacts.forEach((contact) => {
      const result = validateApplicationForm(
        { name: 'Дмитро', contact },
        mockTranslations
      );
      expect(result.isValid).toBe(false);
      expect(result.errors.contact).toBe(mockTranslations.contactError);
    });
  });

  it('повертає помилку, якщо повідомлення довше 500 символів', () => {
    const longMessage = 'a'.repeat(501);
    const result = validateApplicationForm(
      { name: 'Олег', contact: '+380501234567', message: longMessage },
      mockTranslations
    );
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBe(mockTranslations.messageError);
  });

  it('дозволяє порожнє або відсутнє повідомлення (воно опційне)', () => {
    const result = validateApplicationForm(
      { name: 'Олег', contact: '+380501234567' },
      mockTranslations
    );
    expect(result.isValid).toBe(true);
    expect(result.errors.message).toBeUndefined();
  });
  it('коректно обробляє випадок, коли поле контакту не передано взагалі', () => {
  const result = validateApplicationForm({ name: 'Тест' }, mockTranslations);
  expect(result.isValid).toBe(false);
  expect(result.errors.contact).toBe(mockTranslations.contactError);
});
});