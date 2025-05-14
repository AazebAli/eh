document.addEventListener('DOMContentLoaded', () => {
  const scheduleBtn = document.querySelector('.text-wrapper-29');

  scheduleBtn.addEventListener('click', async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (!loggedInUser) {
      alert('User not logged in');
      return;
    }

    const seller_id = loggedInUser.id; // ✅ Use correct field

    const productName = document.getElementById('product-name').value;
    const startingPrice = parseFloat(document.getElementById('text-wrapper-30').value);
    const imageUrl = document.getElementById('image-5').value; // ✅ Updated to use a text field
    const auctionEndTime = document.getElementById('auction-end-time').value;
    const auctionstarttime = document.getElementById('auction-start-time').value;
    if (!imageUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
      alert('Please enter a valid image URL (ending with .jpg, .png, etc.)');
      return;
    }

    if (!productName || isNaN(startingPrice) || !imageUrl) {
      alert('Please fill in all required fields');
      return;
    }
    if (!auctionEndTime) {
        alert('Please provide auction end time.');
        return;
    }
    if (!auctionstarttime) {
        alert('Please provide auction start time.');
        return;
    }
    const productData = {
      seller_id,
      product_name: productName,
      starting_price: startingPrice,
      image_url: imageUrl,
      end_time: auctionEndTime,
      start_time: auctionstarttime
    };

    try {
      const response = await fetch('http://localhost:3000/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add product');
    }
  });
});
