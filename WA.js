const articlesContainer = document.getElementById('articles');

fetch(
  'https://newsapi.org/v2/everything?q=weather&apiKey=6717596a90294dd5acdde04c0880dd41'
)
  .then((response) => response.json())
  .then((data) => {
    if (data && data.articles) {
      data.articles.forEach((article) => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';

        const articleImage = document.createElement('div');
        articleImage.className = 'article-image';

        const img = document.createElement('img');
        img.src = article.urlToImage;
        articleImage.appendChild(img);

        const articleContent = document.createElement('div');
        articleContent.className = 'article-content';

        const articleTitle = document.createElement('h2');
        articleTitle.className = 'article-title';

        const titleLink = document.createElement('a');
        titleLink.href = article.url;
        titleLink.target = '_blank';
        titleLink.textContent = article.title;
        articleTitle.appendChild(titleLink);

        const articleDescription = document.createElement('p');
        articleDescription.className = 'article-description';
        articleDescription.textContent = article.description;

        const descriptionLink = document.createElement('a');
        descriptionLink.href = article.url;
        descriptionLink.target = '_blank';
        descriptionLink.appendChild(articleDescription);

        // Display the publication date
        const articleDate = document.createElement('p');
        articleDate.className = 'article-date';
        const formattedDate = new Date(article.publishedAt).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
        articleDate.textContent = `Published on: ${formattedDate}`;

        articleContent.appendChild(articleTitle);
        articleContent.appendChild(descriptionLink);
        articleContent.appendChild(articleDate); // Add the article date to the content

        articleElement.appendChild(articleImage);
        articleElement.appendChild(articleContent);

        articlesContainer.appendChild(articleElement);
      });
    } else {
      console.error('Error fetching articles. Response object:', data);
      console.error('Status:', data.status);
      console.error('Message:', data.message);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

window.addEventListener("message", (event) => {
  if (event.data.toggleDarkMode) {
    document.body.classList.toggle("dark");
  }
});