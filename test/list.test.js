import {getBreedData, getRandomBreedData} from '../src/list.js';

describe('getBreedData', () => {
  it('should return a list of breed data', async () => {
    const breedData = await getBreedData('askal-doge', true);
    expect(Array.isArray(breedData)).toBeTruthy();
  });
  it('should have url, breedSlug and imgName per breed datum', async () => {
    const breedData = await getBreedData('askal-doge', true);
    breedData.forEach(breedData => {
      expect(breedData).toEqual(expect.objectContaining({
        url: expect.any(String),
        breedSlug: expect.any(String),
        imgName: expect.any(String),
      }));
    });
  });
});

describe('getRandomBreedData', () => {
  it('should return a list of breed data', async () => {
    const breedData = await getRandomBreedData(true);
    expect(Array.isArray(breedData)).toBeTruthy();
  });
  it('should have url, breedSlug and imgName per breed datum', async () => {
    const breedData = await getRandomBreedData(true);
    breedData.forEach(breedData => {
      expect(breedData).toEqual(expect.objectContaining({
        url: expect.any(String),
        breedSlug: expect.any(String),
        imgName: expect.any(String),
      }));
    });
  });
});