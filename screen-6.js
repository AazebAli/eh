window.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('bidContainer');
    const loggedinuser = localStorage.getItem('user');

    if (!loggedinuser) {
        window.location.href = 'screen-5.html';
        return;
    }

    const user = JSON.parse(loggedinuser);
    const userId = user.id;

    try {
        const response = await fetch(`http://localhost:3000/get-user-bids?user_id=${userId}`);
        const bids = await response.json();

        if (!Array.isArray(bids) || bids.length === 0) {
            container.innerHTML = '<p>No bids placed yet.</p>';
            return;
        }

        bids.forEach(bid => {
            const bidCard = document.createElement('div');
            bidCard.className = 'bid-card';

            // Save bid data locally and redirect on click
            bidCard.addEventListener('click', () => {
                localStorage.setItem('selectedBid', JSON.stringify(bid));
                window.location.href = 'div-wrapper.html';
            });

            bidCard.innerHTML = `
                <div class="bid-content">
                    <img src="${bid.img_url}" alt="${bid.product_name}" class="bid-image"/>
                    <h3 class="bid-title">${bid.product_name}</h3>
                    <p class="bid-price">Bid Amount: ${bid.bid_amount} RS</p>
                    <p class="bid-time">Bid Placed At: ${new Date(bid.sent_at).toLocaleString()}</p>
                </div>
            `;

            container.appendChild(bidCard);
        });
    } catch (err) {
        console.error('Error fetching user bids:', err);
        container.innerHTML = '<p>Error loading bids. Please try again later.</p>';
    }
});
