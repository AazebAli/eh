window.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('auctionContainer');

    try {
        const response = await fetch('http://localhost:3000/get-auctions'); // Fetch auction data
        let auctions = await response.json();

        if (!Array.isArray(auctions) || auctions.length === 0) {
            container.innerHTML = '<p>No active auctions found.</p>';
            return;
        }

        // Sort auctions by highest starting price (descending order)
        auctions.sort((a, b) => b.starting_price - a.starting_price);

        auctions.forEach(auction => {
            const card = document.createElement('div');
            card.className = 'auction-card';

            // Store auction details locally before redirection
            card.addEventListener('click', () => {
                localStorage.setItem('selectedAuction', JSON.stringify(auction));
                window.location.href = `screen-4.html?product=${encodeURIComponent(auction.product_name)}
                &price=${encodeURIComponent(auction.starting_price)}
                &endTime=${encodeURIComponent(auction.end_time)}
                &image=${encodeURIComponent(auction.img_url)}`;
            });

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
