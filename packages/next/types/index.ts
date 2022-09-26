import PropTypes from 'prop-types';

export const entityPropTypes = {
  type: PropTypes.string.isRequired,
  eid: PropTypes.string.isRequired,
  removeEntity: PropTypes.func.isRequired,
  extraInfo: PropTypes.shape({
    tipo: PropTypes.string,
    pv: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    nome: PropTypes.string,
    atalhos: PropTypes.arrayOf(
      PropTypes.shape({
        dados: PropTypes.string,
        nome: PropTypes.string,
      }),
    ),
    notas: PropTypes.string,
  }),
};

export const entityDefaultProps = {
  extraInfo: null,
};
