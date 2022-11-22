import { GetStaticProps } from 'next';
import { withTranslation, i18n } from 'next-i18next';
import PropTypes from 'prop-types';
import styles from '@styles/main.module.sass';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SheetCard from '../../components/fichas/SheetCard';

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
    <main>
      <datalist id="classes">
        <option value="Combatente" aria-label="combatente" />
        <option value="Ocultista" aria-label="ocultista" />
        <option value="Mundano" aria-label="mundano" />
        <option value="Especialista" aria-label="especialista" />
      </datalist>
      <h1 style={{ margin: '0 1rem' }}>Rank Fichas</h1>
      <input
        type="text"
        list="classes"
        placeholder="classe"
        className={styles['sheets-choose-class']}
      />
      <button type="button">Registrar Nova Ficha</button>
      <div className={styles.sheets}>
        {sheets.map((info) => (
          <SheetCard info={info} key={info.token} />
        ))}
      </div>
    </main>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources();
  }
  const props = { ...(await serverSideTranslations(locale ?? 'pt', ['common'])) };
  return {
    props: {
      ...props,
      sheets: [],
    },
  };
};

export default FichasPage;
