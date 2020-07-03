import { breedSlugToPath } from '../src/routing.js';


describe('breedSlugToPath', () => {
  describe('when passed with a breedSlug with no sub-breeds', () => {
    it('should to return the same string', () => {
      const purebreedSlug = 'askal';
      expect(breedSlugToPath(purebreedSlug)).toBe(purebreedSlug);
    });
  });
  describe('when passed with a breedSlug with a sub-breed', () => {
    it('should to return the a string with slashes replacing the dash', () => {
      const subbreedSlug = 'askal-kanto';
      const subbreedPath = 'askal-kanto'.replace(/-/g, '/');
      expect(breedSlugToPath(subbreedSlug)).toBe(subbreedPath);
    });
  });
});