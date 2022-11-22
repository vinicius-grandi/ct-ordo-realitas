import PropTypes from 'prop-types';
import Link from 'next/link';
import useT from '../../lib/hooks/useT';

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
  const t = useT();
  const hrefArr = [
    '/simulacao',
    '/fichas',
    '/rituais',
  ];

  return (
    <ul id={id} role={role} aria-labelledby={aria}>
      {hrefArr.map((href) => {
        const paths = href.split('/');
        const path = paths[paths.length - 1];
        return <MenuItem href={href} key={href} label={t(`${path}.title`)} hc={handleClose} />;
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
