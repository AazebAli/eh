document.addEventListener('DOMContentLoaded', () => {
  const scheduleBtn = document.querySelector('.text-wrapper-29');

  scheduleBtn.addEventListener('click', async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (!loggedInUser) {
      alert('User not logged in');
      return;
    }

    const seller_id = loggedInUser.id;
    const productName = document.getElementById('product-name').value;
    const startingPrice = parseFloat(document.getElementById('text-wrapper-30').value);
    const imageUrl = document.getElementById('image-5').value;
    const auctionEndTime = document.getElementById('auction-end-time').value;
    const auctionStartTime = document.getElementById('auction-start-time').value;

    // Input validations
    if (!productName || isNaN(startingPrice) || !imageUrl || !auctionEndTime || !auctionStartTime) {
      alert('Please fill in all required fields');
      return;
    }

    if (!imageUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
      alert('Please enter a valid image URL (ending with .jpg, .png, etc.)');
      return;
    }

    // Prepare product data
    const productData = {
      seller_id,
      product_name: productName,
      starting_price: startingPrice,
      image_url: imageUrl,
      end_time: auctionEndTime,
      start_time: auctionStartTime
    };

    try {
      // Step 1: Add product
      const response = await fetch('http://localhost:3000/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      const result = await response.json();

      if (!result.product_id) {
        alert('Product could not be created.');
        return;
      }

      const productId = result.product_id;
      localStorage.setItem('latest_product_id', productId);

      // Step 2: Create auction
      const auctionData = {
        prod_id: productId, // ✅ matches the DB column
        start_time: auctionStartTime,
        end_time: auctionEndTime
      };

      const auctionResponse = await fetch('http://localhost:3000/create-auction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auctionData)
      });

      const auctionResult = await auctionResponse.json();

      if (auctionResponse.ok) {
        alert('Product and Auction created successfully!');
      } else {
        alert('Product created, but auction failed: ' + auctionResult.error);
      }

    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while creating the product or auction.');
    }
  });
});
