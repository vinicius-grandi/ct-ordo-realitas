import { withTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import SheetCard from '../../components/fichas/SheetCard';
import { getStaticProps } from '../rituais';

export type Sheet = {
  token: string;
  imagePath: string;
  name: string;
  for: number;
  agi: number;
  pre: number;
  vig: number;
  int: number;
  author: string;
  vd: number;
};

interface SheetArr {
  sheets: Sheet[];
}

function FichasPage({ sheets }: SheetArr) {
  return (
    <div>
      <datalist id="classes">
        <option value="Combatente" aria-label="combatente" />
        <option value="Ocultista" aria-label="ocultista" />
        <option value="Mundano" aria-label="mundano" />
        <option value="Especialista" aria-label="especialista" />
      </datalist>
      <h1>Rank Fichas</h1>
      <input type="text" list="classes" placeholder="classe" />
      {sheets.map((info) => (
        <SheetCard info={info} />
      ))}
    </div>
  );
}

FichasPage.defaultProps = {
  sheets: [],
};

FichasPage.propTypes = {
  sheets: PropTypes.arrayOf(
    PropTypes.shape({
      token: PropTypes.string,
      imagePath: PropTypes.string,
      name: PropTypes.string,
      for: PropTypes.number,
      agi: PropTypes.number,
      pre: PropTypes.number,
      vig: PropTypes.number,
      int: PropTypes.number,
      author: PropTypes.string,
      vd: PropTypes.number,
    }),
  ),
};

export const Fichas = withTranslation('common')(FichasPage);

export { getStaticProps };

export default FichasPage;
