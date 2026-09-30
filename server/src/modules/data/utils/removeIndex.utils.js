export const removeIndex = (fields) => {
  for (let i = 0; i < fields.length; i++) {
    const { key, value } = fields[i];
    fields[i] = { key, value };
  }

  return fields;
};
