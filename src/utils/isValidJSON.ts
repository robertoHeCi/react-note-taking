export const isValidJson = (str: { body: string, [key: string]: string }) => {
  try {
    JSON.parse(str.body);
    return true;
  } catch {
    return false;
  }
};