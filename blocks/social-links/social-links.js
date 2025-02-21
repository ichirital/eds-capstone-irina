export default async function decorate(block) {
  const links = {};
  
  // Extract links from the block's content.  Assumes structure:
  // <div><a href="facebook-link">Facebook</a></div>
  // <div><a href="twitter-link">Twitter</a></div>
  // <div><a href="instagram-link">Instagram</a></div>

  block.querySelectorAll('div a').forEach(a => {
    const platform = a.textContent.toLowerCase(); // Get platform name
    const href = a.href;
    if (platform && href) {
      links[platform] = href;
    }
  });

  if (Object.keys(links).length === 0) {
    block.innerHTML = '<p>No social links found.</p>';
    return;
  }

  let socialLinksHTML = '<div class="social-links-container">'; 

  for (const platform in links) {
    const href = links[platform];
    const iconClass = `icon-${platform}`; // Class for platform-specific icon

    socialLinksHTML += `
      <a href="${href}" target="_blank" rel="noopener noreferrer" class="social-link">
        <span class="social-icon ${iconClass}"><img data-icon-name="search" src="/icons/${platform}.svg" alt="" loading="lazy"></span>
      </a>
    `;
  }

  socialLinksHTML += '</div>';

  console.log(socialLinksHTML);
  block.innerHTML = socialLinksHTML;
}
