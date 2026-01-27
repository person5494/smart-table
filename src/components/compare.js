export const rules = {
  skipEmptyTargetValues: (row, state, field) => {
    return state[field] === '' || row[field].toString().includes(state[field]);
  },
  searchMultipleFields: (searchField, fields, caseSensitive = false) => {
    return (row, state) => {
      const query = state[searchField];
      if (!query) return true;
      return fields.some(field => {
        let value = row[field];
        if(!caseSensitive) {
          value = value.toString().toLowerCase();
          return value.includes(query.toLowerCase());
        }
      return value.toString().includes(query);
      })
    }
  }
};

export function createComparison(rulesArray) {
  return (row, state) => {
    return rulesArray.every(rule => rule(row, state));
  }
}