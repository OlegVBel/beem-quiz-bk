import * as bcrypt from 'bcrypt';
import { hashPassword, comparePassword } from './hash';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('hashPassword', () => {
  it('should hash the password correctly', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    const result = await hashPassword('myPassword');
    expect(result).toBe('hashedPassword');
    expect(bcrypt.hash).toHaveBeenCalledWith('myPassword', 12);
  });

  it('should throw an error when bcrypt fails', async () => {
    (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('bcrypt error'));
    await expect(hashPassword('myPassword')).rejects.toThrow('bcrypt error');
  });
});

describe('comparePassword', () => {
  it('should return true when passwords match', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    const result = await comparePassword('myPassword', 'hashedPassword');
    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith('myPassword', 'hashedPassword');
  });

  it('should return false when passwords do not match', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    const result = await comparePassword('myPassword', 'hashedPassword');
    expect(result).toBe(false);
  });

  it('should throw an error when bcrypt fails', async () => {
    (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('bcrypt error'));
    await expect(comparePassword('myPassword', 'hashedPassword')).rejects.toThrow('bcrypt error');
  });
});
