import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Semantic App Shell Baseline', () => {
  it('renders essential semantic landmarks: header, main, and footer', () => {
    render(<Home />);

    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
