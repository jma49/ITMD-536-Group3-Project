describe('CI/CD Dashboard', () => {
  beforeEach(() => {
    // Mock the API call to return fake CI/CD data
    cy.intercept('GET', '/api/status', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            _id: '1',
            stage: 'Build',
            status: 'Success',
            logs: 'Commit: abc123\nAuthor: John Doe\nBuild completed successfully',
            time: '2024-11-24T10:00:00Z'
          },
          {
            _id: '2',
            stage: 'Test',
            status: 'Failed',
            logs: 'Commit: def456\nAuthor: Jane Doe\nTests failed on line 42',
            time: '2024-11-24T10:05:00Z'
          }
        ]
      }
    }).as('fetchCIStatus');

    // Visit the page 
    cy.visit('/');
  });

  it('should display the correct page title', () => {
    // Check if the page title is correctly set
    cy.title().should('include', 'CI/CD Dashboard');
  });

  it('should show a loading spinner initially', () => {
    // Check for the loading spinner element before the data loads
    cy.get('.animate-spin').should('be.visible');
  });

  it('should display CI/CD data once loaded', () => {
    // Wait for the mock API call to complete
    cy.wait('@fetchCIStatus');

    // Check if the stage and status of the first CI status are displayed correctly
    cy.get('.grid > .overflow-hidden').eq(0).within(() => {
      cy.get('h2').should('contain.text', 'Build');  // Stage
      cy.get('.px-3').should('contain.text', 'Success');  // Status
      cy.get('.bg-gray-50').should('contain.text', 'Commit: abc123');  // Log info
    });

    // Check if the stage and status of the second CI status are displayed correctly
    cy.get('.grid > .overflow-hidden').eq(1).within(() => {
      cy.get('h2').should('contain.text', 'Test');  // Stage
      cy.get('.px-3').should('contain.text', 'Failed');  // Status
      cy.get('.bg-gray-50').should('contain.text', 'Commit: def456');  // Log info
    });
  });

  it('should display loading text when no data is available', () => {
    // Test when no CI/CD data is available (mock empty data)
    cy.intercept('GET', '/api/status', {
      statusCode: 200,
      body: { success: true, data: [] }
    }).as('fetchNoData');

    cy.visit('/');
    cy.wait('@fetchNoData');

    cy.get('.col-span-full').within(() => {
      cy.get('p').should('contain.text', 'Loading...');
    });
  });

  it('should refresh the data every 5 seconds', () => {
    // Mock the API to return different data
    cy.intercept('GET', '/api/status', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            _id: '3',
            stage: 'Deploy',
            status: 'Success',
            logs: 'Commit: ghi789\nAuthor: Sam Smith\nDeployment successful',
            time: '2024-11-24T10:10:00Z'
          }
        ]
      }
    }).as('fetchNewData');

    // Visit the page and wait for the initial data
    cy.visit('/');
    cy.wait('@fetchCIStatus');

    // Wait for 5 seconds and check if the data is refreshed
    cy.wait(5000);  // Wait for data refresh
    cy.wait('@fetchNewData');

    // Check if the new data (Deploy stage) is shown
    cy.get('.grid > .overflow-hidden').eq(0).within(() => {
      cy.get('h2').should('contain.text', 'Deploy');
      cy.get('.px-3').should('contain.text', 'Success');
    });
  });
});
