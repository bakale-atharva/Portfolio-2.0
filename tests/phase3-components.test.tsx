import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { portfolioContent } from '@/content/portfolio';

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
  writable: true,
});

describe('Phase 3 — Static Editorial Composition', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all section anchor targets in the main page', () => {
    const { container } = render(<Home />);

    expect(container.querySelector('#top')).toBeInTheDocument();
    expect(container.querySelector('#work')).toBeInTheDocument();
    expect(container.querySelector('#services')).toBeInTheDocument();
    expect(container.querySelector('#skills')).toBeInTheDocument();
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('renders header navigation with correct anchor targets and accessibility', () => {
    render(<Home />);

    const nav = screen.getByRole('navigation', { name: 'Main Navigation' });
    expect(nav).toBeInTheDocument();

    const workLink = screen.getByRole('link', { name: /\/\/ 01 WORK/i });
    const servicesLink = screen.getByRole('link', { name: /\/\/ 02 SERVICES/i });
    const skillsLink = screen.getByRole('link', { name: /\/\/ 03 SKILLS/i });
    const aboutLink = screen.getByRole('link', { name: /\/\/ 04 ABOUT/i });

    expect(workLink).toHaveAttribute('href', '#work');
    expect(servicesLink).toHaveAttribute('href', '#services');
    expect(skillsLink).toHaveAttribute('href', '#skills');
    expect(aboutLink).toHaveAttribute('href', '#about');
  });

  it('renders hero positioning statement, profile details, and CTAs', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /I build expressive digital experiences/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(portfolioContent.profile.tagline)).toBeInTheDocument();

    const viewWorkCTA = screen.getByRole('link', { name: /View work/i });
    const startProjectCTA = screen.getByRole('link', { name: /Start a project/i });

    expect(viewWorkCTA).toHaveAttribute('href', '#work');
    expect(startProjectCTA).toHaveAttribute('href', '#contact');
  });

  it('renders proof metrics in the proof rail', () => {
    render(<Home />);

    portfolioContent.metrics.forEach((metric) => {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(`// ${metric.label}`)).toBeInTheDocument();
    });
  });

  it('renders featured project cards with technologies and external links', () => {
    render(<Home />);

    portfolioContent.projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.summary)).toBeInTheDocument();

      project.technologies.forEach((tech) => {
        expect(screen.getAllByText(tech).length).toBeGreaterThan(0);
      });
    });

    const liveLinks = screen.getAllByRole('link', { name: /Live Preview/i });
    expect(liveLinks.length).toBe(portfolioContent.projects.length);
    liveLinks.forEach((link, idx) => {
      expect(link).toHaveAttribute('href', portfolioContent.projects[idx].liveUrl);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    // Check optional GitHub source links for projects that have githubUrl
    const projectsWithGithub = portfolioContent.projects.filter((p) => p.githubUrl !== null);
    const sourceLinks = screen.getAllByRole('link', { name: /Source/i });
    expect(sourceLinks.length).toBe(projectsWithGithub.length);
    sourceLinks.forEach((link, idx) => {
      expect(link).toHaveAttribute('href', projectsWithGithub[idx].githubUrl);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders services grid with deliverables and contact CTAs', () => {
    render(<Home />);

    portfolioContent.services.forEach((service) => {
      expect(screen.getByRole('heading', { level: 3, name: service.title })).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: service.ctaText })).toHaveAttribute('href', '#contact');

      service.deliverables.forEach((deliverable) => {
        expect(screen.getByText(deliverable)).toBeInTheDocument();
      });
    });
  });

  it('renders grouped skills matrix and ticker', () => {
    render(<Home />);

    portfolioContent.skillGroups.forEach((group) => {
      expect(screen.getByRole('heading', { level: 3, name: group.category })).toBeInTheDocument();
      group.skills.forEach((skill) => {
        expect(screen.getAllByText(skill).length).toBeGreaterThan(0);
      });
    });
  });

  it('renders about section with profile bio and résumé download link', () => {
    render(<Home />);

    const resumeLink = screen.getByRole('link', { name: /Download Résumé \(PDF\)/i });
    expect(resumeLink).toHaveAttribute('href', portfolioContent.profile.resumeUrl);
    expect(resumeLink).toHaveAttribute('target', '_blank');
    expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders contact section with mailto link, social links, and copy email functionality', async () => {
    render(<Home />);

    const mailtoButton = screen.getByRole('link', { name: 'Send email via default client' });
    expect(mailtoButton).toHaveAttribute('href', `mailto:${portfolioContent.profile.email}`);

    portfolioContent.socialLinks.forEach((social) => {
      const socialLink = screen.getByRole('link', { name: social.name });
      expect(socialLink).toHaveAttribute('href', social.url);
      expect(socialLink).toHaveAttribute('target', '_blank');
      expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    const copyBtn = screen.getByRole('button', { name: 'Copy email address' });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(portfolioContent.profile.email);
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('renders footer with copyright and back to top link', () => {
    render(<Home />);

    const backToTopLinks = screen.getAllByRole('link', { name: /Back to top/i });
    expect(backToTopLinks.length).toBeGreaterThan(0);
    backToTopLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '#top');
    });
  });
});
