import PropTypes from 'prop-types';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";

const MenuItem = ({ href, label, hc }: { href: string; label: string; hc: () => void }) => (
  <li>
    <button type="button" onClick={() => hc()}>
      <Link href={href}>
        <a>{label}</a>
      </Link>
    </button>
  </li>
);

const Menu = ({
  id,
  role,
  aria,
  handleClose,
}: {
  id: string;
  role: string;
  aria: string;
  handleClose: () => void;
}) => {
  const hrefArr = [
    '/simulacao',
    '/classes/ocultista',
    '/classes/combatente',
    '/classes/especialista',
  ];
  const { locale } = useRouter();
  const { t: earlyT } = useTranslation('');
  const t = (key: string) => earlyT(`${locale}.translations.${key}`);
  return (
    <ul id={id} role={role} aria-labelledby={aria}>
      {hrefArr.map((href) => {
        const paths = href.split('/');
        const path = paths[paths.length - 1];
        return (
          <MenuItem
            href={href}
            key={href}
            label={t(`${path}.title`)}
            hc={handleClose}
          />
        );
      })}
    </ul>
  );
};

Menu.defaultProps = {
  id: '',
  role: undefined,
  aria: '',
};

Menu.propTypes = {
  id: PropTypes.string,
  role: PropTypes.string,
  aria: PropTypes.string,
};

export default Menu;
