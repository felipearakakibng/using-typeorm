export const stripUndefined = (obj: Object) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key] && !(obj[key] instanceof Date)))
      newObj[key] = stripUndefined(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};
