import keys from "./optionKeys";
import {AdeliomMapErrorsType} from "./AdeliomMapTypes";

const errors: AdeliomMapErrorsType = {
    apiKey: {
        notProvided: `${keys.apiKey} not provided`
    },
    selectors: {
        map: {
            notProvided: `Need to provide ${keys.map.selector} option`,
            notFound: `No element found with matching selector provided in ${keys.map.selector}`,
            tooSmall: `The map container is too small`,
        }
    },
};

export default errors;