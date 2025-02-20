export default function decorate(block) {

  const name = block.querySelector('div:nth-child(1) > p')?.textContent.trim(); // Get name from first div
  const avatarSrc = block.querySelector('div:nth-child(2) > div > picture > img')?.src; // Get avatar src
  const title = block.querySelector('div:nth-child(3)')?.textContent.trim(); // Get title from third div

  if (!name || !avatarSrc || !title) {
    console.error('Author details block is missing required content (name, avatar, or title).');
    block.innerHTML = '<p>Missing author details.</p>'; // Simple error message
    return;
  }

  const authorDetailsHTML = `
    <div class="author-details-container">
      <img class="author-avatar" src="${avatarSrc}" alt="${name}'s avatar">
      <div class="author-info">
        <h3 class="author-name">${name}</h3>
        <p class="author-title">${title}</p>
      </div>
    </div>
  `;

  block.innerHTML = authorDetailsHTML; // Set the block's content
}
