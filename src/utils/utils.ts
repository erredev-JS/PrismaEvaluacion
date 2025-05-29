export const convertBigIntFields = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntFields);
  } else if (obj !== null && typeof obj === 'object') {
    const res: any = {};
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'bigint') {
        const maxSafe = BigInt(Number.MAX_SAFE_INTEGER);
        if (value <= maxSafe && value >= -maxSafe) {
          res[key] = Number(value);
        } else {
          res[key] = value.toString();
        }
      } else if (typeof value === 'object') {
        res[key] = convertBigIntFields(value);
      } else {
        res[key] = value;
      }
    }
    return res;
  } else {
    return obj;
  }
}
