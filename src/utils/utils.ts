import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    return error;
  }
};

const checkPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

const formatResponseToISO8601 = (inputString: string): string => {
  const year = inputString.slice(0, 4);
  const month = inputString.slice(4, 6);
  const day = inputString.slice(6, 8);
  const hours = inputString.slice(8, 10);
  const minutes = inputString.slice(10, 12);
  const seconds = inputString.slice(12, 14);

  // Create a Date object using the extracted components
  const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  // Convert to ISO-8601 DateTime format
  const isoDateTime = new Date(isoDateString).toISOString();

  return isoDateTime;
};

export { hashPassword, checkPassword, formatResponseToISO8601 };
