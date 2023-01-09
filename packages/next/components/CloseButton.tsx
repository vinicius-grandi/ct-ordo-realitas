import PropTypes from 'prop-types';

const CloseButton = ({ handleClose }: { handleClose: () => void }) => (
  <button type="button" aria-label="close" onClick={handleClose}>
    X
  </button>
);

CloseButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default CloseButton;
