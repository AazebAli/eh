// document.addEventListener('DOMContentLoaded', () => {
//   const scheduleBtn = document.querySelector('.text-wrapper-29');

//   scheduleBtn.addEventListener('click', async () => {
//     const loggedInUser = JSON.parse(localStorage.getItem('user'));

//     if (!loggedInUser) {
//       alert('User not logged in');
//       return;
//     }

//     const seller_id = loggedInUser.id;
//     const productName = document.getElementById('product-name').value;
//     const startingPrice = parseFloat(document.getElementById('text-wrapper-30').value);
//     const imageUrl = document.getElementById('image-5').value;
//     const auctionEndTime = document.getElementById('auction-end-time').value;
//     const auctionStartTime = document.getElementById('auction-start-time').value;

//     // Input validations
//     if (!productName || isNaN(startingPrice) || !imageUrl || !auctionEndTime || !auctionStartTime) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     // if (!imageUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
//     //   alert('Please enter a valid image URL (ending with .jpg, .png, etc.)');
//     //   return;
//     // }

//     // Prepare product data
//     const productData = {
//       seller_id,
//       product_name: productName,
//       starting_price: startingPrice,
//       image_url: imageUrl,
//       end_time: auctionEndTime,
//       start_time: auctionStartTime
//     };

//     try {
//       // Step 1: Add product
//       const response = await fetch('http://localhost:3000/add-product', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(productData)
//       });

//       const result = await response.json();

//       if (!result.product_id) {
//         alert('Product could not be created.');
//         return;
//       }

//       const productId = result.product_id;
//       localStorage.setItem('latest_product_id', productId);

//       // Step 2: Create auction
//       const auctionData = {
//         prod_id: productId, // ✅ matches the DB column
//         start_time: auctionStartTime,
//         end_time: auctionEndTime
//       };

//       const auctionResponse = await fetch('http://localhost:3000/create-auction', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(auctionData)
//       });

//       const auctionResult = await auctionResponse.json();

//       if (auctionResponse.ok) {
//         alert('Product and Auction created successfully!');
//       } else {
//         alert('Product created, but auction failed: ' + auctionResult.error);
//       }

//     } catch (err) {
//       console.error('Error:', err);
//       alert('An error occurred while creating the product or auction.');
//     }
//   });
// });
// document.addEventListener('DOMContentLoaded', () => {
//   const scheduleBtn = document.querySelector('.text-wrapper-29');

//   scheduleBtn.addEventListener('click', async () => {
//     const loggedInUser = JSON.parse(localStorage.getItem('user'));

//     if (!loggedInUser) {
//       alert('User not logged in');
//       return;
//     }

//     const seller_id = loggedInUser.id;
//     const productName = document.getElementById('product-name').value;
//     const startingPrice = parseFloat(document.getElementById('text-wrapper-30').value);
//     const imageUrl = document.getElementById('image-5').value;
//     const auctionEndTime = document.getElementById('auction-end-time').value;
//     const auctionStartTime = document.getElementById('auction-start-time').value;

//     // Input validations
//     if (!productName || isNaN(startingPrice) || !imageUrl || !auctionEndTime || !auctionStartTime) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     // Prepare product data
//     const productData = {
//       seller_id,
//       product_name: productName,
//       starting_price: startingPrice,
//       image_url: imageUrl,
//       end_time: auctionEndTime,
//       start_time: auctionStartTime
//     };

//     try {
//       // Step 1: Add product
//       const response = await fetch('http://localhost:3000/add-product', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(productData)
//       });

//       const result = await response.json();

//       if (!result.product_id) {
//         alert('Product could not be created.');
//         return;
//       }

//       const productId = result.product_id;
//       localStorage.setItem('latest_product_id', productId);

//       // Step 2: Create auction
//       const auctionData = {
//         prod_id: productId,
//         start_time: auctionStartTime,
//         end_time: auctionEndTime
//       };

//       const auctionResponse = await fetch('http://localhost:3000/create-auction', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(auctionData)
//       });

//       const auctionResult = await auctionResponse.json();

//       if (auctionResponse.ok) {
//         alert('Product and Auction created successfully!');

//         // ✅ Store auction details in localStorage
//         const auctionDetails = {
//           auctionId: productId,
//           productName,
//           startingPrice,
//           auctionEndTime,
//           imageUrl,
//         };
//         localStorage.setItem("auctionDetails", JSON.stringify(auctionDetails));
//         console.log("Auction Details Stored:", auctionDetails);
        
//       } else {
//         alert('Product created, but auction failed: ' + auctionResult.error);
//       }

//     } catch (err) {
//       console.error('Error:', err);
//       alert('An error occurred while creating the product or auction.');
//     }
//   });
// });
document.addEventListener('DOMContentLoaded', async () => {
  const scheduleBtn = document.querySelector('.text-wrapper-29');
  const auctionGrid = document.getElementById('auctionGrid'); // Replace with actual container ID
  
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

      // Step 2: Create auction
      const auctionData = {
        prod_id: productId,
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

  // Load auctions dynamically into auction grid
  async function loadAuctions() {
    try {
      const response = await fetch('http://localhost:3000/get-auctions'); // API to fetch all auction details
      const auctions = await response.json();

      auctions.forEach(auction => {
        const auctionLink = document.createElement('a');
        auctionLink.href = `screen-4.html?auction_id=${auction.auction_id}&product=${encodeURIComponent(auction.product_name)}&price=${auction.starting_price}&endTime=${auction.end_time}&image=${auction.image_url}`;
        auctionLink.innerText = `View Auction: ${auction.product_name}`;
        auctionLink.classList.add('auction-item'); // Add styling class if needed
        auctionGrid.appendChild(auctionLink);
      });
    } catch (err) {
      console.error('Error fetching auctions:', err);
      alert('Failed to load auctions.');
    }
  }

  loadAuctions(); // Call function to load auctions when Screen 3 loads
});
