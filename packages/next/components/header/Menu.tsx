import PropTypes from 'prop-types';
import Link from 'next/link';

const Menu = ({ id, role, aria }: {
  id: string;
  role: string ;
  aria: string
}) => (
  <ul id={id} role={role} aria-labelledby={aria}>
    <li>
      <Link href="/simulation">
        simulação
      </Link>
    </li>
    <li>
      <Link href="/classes/ocultista">
        ocultista
      </Link>
    </li>
    <li>
      <Link href="/classes/combatente">
        combatente
      </Link>
    </li>
    <li>
      <Link href="/classes/especialista">
        especialista
      </Link>
    </li>
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
