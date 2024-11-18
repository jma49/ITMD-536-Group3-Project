import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import Home from '../src/app/page';

// Mock data
const mockCIStatus = [
  {
    _id: '1',
    stage: 'Build',
    status: 'Success',
    logs: 'Build completed successfully.',
    time: new Date().toISOString(),
  },
  {
    _id: '2',
    stage: 'Test',
    status: 'Failure',
    logs: 'Tests failed at step 3.',
    time: new Date().toISOString(),
  },
];

describe('Home Component Tests', () => {
  let originalFetch: typeof global.fetch;

  beforeAll(() => {
    originalFetch = global.fetch; // Save the original fetch
  });

  afterAll(() => {
    global.fetch = originalFetch; // Restore the original fetch
  });

  beforeEach(() => {
    global.fetch = jest.fn() as jest.Mock; // Mock fetch
  });

  afterEach(() => {
    jest.useRealTimers(); // Reset timers
  });

  // Test: Basic Rendering
  it('renders the heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('CI/CD Dashboard');
  });

  // Test: Loading State
  it('shows loading state when data is being fetched', async () => {
    (global.fetch as jest.Mock).mockImplementation(() =>
      new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<Home />);

    const loadingSpinner = screen.getByText(/loading/i);
    expect(loadingSpinner).toBeInTheDocument();
  });

  // Test: Successful Data Fetch
  it('renders the CI/CD statuses after data fetch', async () => {
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, data: mockCIStatus }),
      })
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Build')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    expect(screen.getByText('Success')).toHaveClass('bg-green-100 text-green-800');
    expect(screen.getByText('Failure')).toHaveClass('bg-red-100 text-red-800');
  });

  // Test: Error Handling
  it('handles fetch errors gracefully', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Verify fallback UI
    });
  });

  // Test: Periodic Updates
  it('updates data periodically every 5 seconds', async () => {
    jest.useFakeTimers();

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, data: mockCIStatus }),
      })
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Build')).toBeInTheDocument();
    });

    const updatedMockData = [
      {
        _id: '3',
        stage: 'Deploy',
        status: 'Success',
        logs: 'Deployment completed successfully.',
        time: new Date().toISOString(),
      },
    ];

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, data: updatedMockData }),
      })
    );

    act(() => {
      jest.advanceTimersByTime(5000); // Simulate 5 seconds
    });

    await waitFor(() => {
      expect(screen.getByText('Deploy')).toBeInTheDocument();
      expect(screen.getByText('Deployment completed successfully.')).toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  // Test: Incomplete Data
  it('handles incomplete data gracefully', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            data: [{ _id: '1', stage: 'Build', status: null, logs: null, time: null }],
          }),
      })
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Build')).toBeInTheDocument();
    });

    expect(screen.queryByText('null')).not.toBeInTheDocument(); // Ensure null does not appear
    expect(screen.getByText('Log Information:')).toBeInTheDocument(); // Ensure the section exists
  });

  // Snapshot Test
  it('renders the Home component unchanged (snapshot)', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
