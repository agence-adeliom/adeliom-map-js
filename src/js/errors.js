import keys from "./optionKeys";

const errors = {};
errors.apiKey = {};
errors.apiKey.notProvided = `${keys.apiKey} not provided`;
errors.selectors = {};
errors.selectors.map = {};
errors.selectors.map.notProvided = `Need to provide ${keys.map.selector} option`;
errors.selectors.map.notFound = `No element found with matching selector provided in ${keys.map.selector}`
errors.selectors.map.tooSmall = `The map container is too small`;

export default errors;