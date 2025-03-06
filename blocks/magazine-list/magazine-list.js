export default async function decorate(block) {
  // Create a container for the magazine articles
  const container = document.createElement('div');
  container.classList.add('magazine-articles');

  try {
    // Fetch the index.json which contains all pages
    const resp = await fetch('/query-index.json');
    if (!resp.ok) {
      throw new Error(`Failed to fetch query-index.json: ${resp.status}`);
    }
    const json = await resp.json();

    // Filter for magazine articles
    const magazineArticles = json.data.filter((page) => {
      const path = page.path || '';
      return path.startsWith('/magazine/') && !path.endsWith('/magazine/');
    });

    // Sort articles by date if available
    magazineArticles.sort((a, b) => {
      const dateA = a.lastModified || '';
      const dateB = b.lastModified || '';
      return dateB.localeCompare(dateA);
    });

    // Create article cards
    magazineArticles.forEach((article) => {
      const card = document.createElement('div');
      card.classList.add('magazine-article-card');

      const link = document.createElement('a');
      link.href = article.path;
      
      const title = document.createElement('h3');
      title.textContent = article.title || 'Untitled';
      link.appendChild(title);

      if (article.description) {
        const description = document.createElement('p');
        description.classList.add('article-description');
        description.textContent = article.description;
        link.appendChild(description);
      }

      if (article.lastModified) {
        const date = document.createElement('div');
        date.classList.add('article-date');
        date.textContent = new Date(article.lastModified).toLocaleDateString();
        link.appendChild(date);
      }

      card.appendChild(link);
      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading magazine articles:', error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Unable to load magazine articles at this time.';
    container.appendChild(errorMessage);
  }

  // Replace block content with our container
  block.textContent = '';
  block.appendChild(container);
} 