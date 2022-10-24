import PropTypes from 'prop-types';

export const entityPropTypes = {
  elem: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]),
};

export default entityPropTypes;
