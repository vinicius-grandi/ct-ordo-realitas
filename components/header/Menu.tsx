import PropTypes from 'prop-types';
import Link from 'next/link';

const Menu = ({ id, role, aria }: {
  id: string;
  role: string ;
  aria: string
}) => (
  <ul id={id} role={role} aria-labelledby={aria}>
    <Link href="/simulation">
      <li>simulação</li>
    </Link>
    <Link href="/classes/ocultista">
      <li>ocultista</li>
    </Link>
    <Link href="/classes/combatente">
      <li>combatente</li>
    </Link>
    <Link href="/classes/especialista">
      <li>especialista</li>
    </Link>
  </ul>
);

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
