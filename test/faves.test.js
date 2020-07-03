import { addFav, getFavs} from '../src/faves.js';

describe('getFavs', () => {
  const mockalStorage = {setItem: () => {}, getItem: () => null,};
  describe('when storage somehow has no data', () => {
    it('should return an empty list', () => {
      expect(getFavs(mockalStorage)).toEqual([]);
    });
  });

  describe('when storage somehow has some data', () => {
    const items = [{breedSlug: 'askal', imgName: 'foo.jpg'}];
    beforeEach(() => {
      mockalStorage.getItem = () => JSON.stringify(items);
    });
    it('should return an empty list', () => {
      expect(getFavs(mockalStorage)).toEqual(items);
    });
  });

  describe('when storage somehow has corrupted data', () => {
    const items = '][foonev3rgonna6iveyuWAPbar][';
    beforeEach(() => {
      mockalStorage.getItem = () => JSON.stringify(items);
    });
    it('should return an empty list', () => {
      expect(getFavs(mockalStorage)).toEqual([]);
    });
  });
});

describe('addFav', () => {
  let storageData = null;
  const mockalStorage = {
    setItem: (key, val) => storageData = val,
    getItem: () => storageData,
  };
  const newFav = {breedSlug: 'askal', imgName: 'foo'};
  describe('when storage somehow has no data', () => {
    it('should return a list containing just the new fav', () => {
      addFav(mockalStorage, newFav);
      expect(JSON.parse(storageData))
        .toEqual([newFav]);
    });
  });

  describe('when storage somehow has some data', () => {
    const storedData = [{breedSlug: 'askal', imgName: 'bar'}];
    beforeEach(() => {
      storageData = JSON.stringify(storedData);
    });
    it('should return an empty list', () => {
      addFav(mockalStorage, newFav);
      expect(JSON.parse(storageData)).toEqual([...storedData, newFav]);
    });
  });

  describe('when storage somehow has corrupted data', () => {
    beforeEach(() => {
      storageData = '][foonev3rgonna6iveyuWAPbar][';
    });

    it('should return a list containing just the new fav', () => {
      addFav(mockalStorage, newFav);
      expect(JSON.parse(storageData))
        .toEqual([newFav]);
    });
  });
});