import { withTranslation } from 'next-i18next';
import getStaticProps from '@components/withTranslationProps';

function AdminLoginPage() {
  return <h1>Login</h1>;
}

export { getStaticProps };

export const AdminLogin = withTranslation('common')(AdminLoginPage);

export default AdminLoginPage;
