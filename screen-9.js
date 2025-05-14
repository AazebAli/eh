window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('auctionContainer');

  try {
    const response = await fetch('http://localhost:3000/get-auctions'); // Fetch auction data
    let auctions = await response.json();

    if (!Array.isArray(auctions) || auctions.length === 0) {
      container.innerHTML = '<p>No active auctions found.</p>';
      return;
    }

    // Sort auctions by end time in descending order (newer ones first)
    auctions.sort((a, b) => new Date(b.end_time) - new Date(a.end_time));

    auctions.forEach(auction => {
      const card = document.createElement('div');
      card.className = 'auction-card';

      card.innerHTML = `
        <img src="${auction.img_url}" alt="${auction.product_name}" class="auction-image"/>
        <h3 class="auction-title">${auction.product_name}</h3>
        <p class="auction-price">Starting Price: ${auction.starting_price} RS</p>
        <p class="auction-end">Auction Ends: ${new Date(auction.end_time).toLocaleString()}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error fetching auctions:', err);
    container.innerHTML = '<p>Error loading auctions. Please try again later.</p>';
  }
});
