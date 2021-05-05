const descendingComparator = (a, b, orderBy) => {
  const property = orderBy.split('.');

  for (const prop of property) {
    a = a[prop];
    b = b[prop];
  }

  if (typeof a === 'string') {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }

  if (b < a) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
};

export default descendingComparator;
