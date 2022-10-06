import { render } from '@testing-library/react';
import SimulacaoProvider from '../../contexts/simulacao';

export default function customRender(elem: JSX.Element) {
  return render(<SimulacaoProvider>{elem}</SimulacaoProvider>);
}
