import { devsSource, generalSource, apiSource } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { loader } from 'fumadocs-core/source';
import { docs } from '@/.source';
import { NextRequest } from 'next/server';

// Create a combined source for search that includes all sections
const combinedSource = loader({
  baseUrl: '', // No base URL since we'll handle routing manually
  source: docs.toFumadocsSource(),
});

// Create the base search handler
const baseSearchHandler = createFromSource(combinedSource, {
  // https://docs.orama.com/open-source/supported-languages
  language: 'english',
});

// Custom search result processor to handle URL rewriting
function processSearchResults(results: any[]) {
  return results.map(result => {
    // Get the original URL from the result
    const originalUrl = result.url || '';
    
    // Determine the correct base URL based on the path
    if (originalUrl.startsWith('devs/')) {
      // Remove 'devs/' prefix and add '/devs' base
      const pathWithoutDevs = originalUrl.replace('devs/', '');
      result.url = `/devs/${pathWithoutDevs}`;
    } else if (originalUrl.startsWith('general/')) {
      // Remove 'general/' prefix and add '/general' base
      const pathWithoutGeneral = originalUrl.replace('general/', '');
      result.url = `/general/${pathWithoutGeneral}`;
    } else if (originalUrl.startsWith('api/')) {
      // Remove 'api/' prefix and add '/api' base
      const pathWithoutApi = originalUrl.replace('api/', '');
      result.url = `/api/${pathWithoutApi}`;
    } else {
      // If no section prefix, assume it's a devs page
      result.url = `/devs/${originalUrl}`;
    }
    
    return result;
  });
}

export async function GET(request: NextRequest) {
  // Call the base search handler
  const response = await baseSearchHandler.GET(request);
  
  // Get the search results from the response
  const data = await response.json();
  
  // Process the search results to fix URLs
  if (data.results) {
    data.results = processSearchResults(data.results);
  }
  
  // Return the modified response
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: response.headers,
  });
}
