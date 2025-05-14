window.addEventListener('DOMContentLoaded', async () => {
  // Retrieve auction details from local storage
  const storedAuction = localStorage.getItem("selectedAuction");

  if (!storedAuction) {
    console.error("Error: No auction data found in local storage.");
    alert("Auction data is missing. Redirecting...");
    window.location.href = "index.html"; // Redirect to a safe page
    return;
  }

  const auction = JSON.parse(storedAuction);
  console.log("Loaded auction from local storage:", auction);

  // Get HTML elements
  const auctionNameElement = document.getElementById("auctionName");
  const startingPriceElement = document.getElementById("startingPrice");
  const currentBidElement = document.getElementById("currentBid");
  const auctionEndTimeElement = document.getElementById("auctionEndTime");
  const auctionImageElement = document.getElementById("auctionImage");
  const bidInputElement = document.getElementById("bidAmount");
  const placeBidButton = document.getElementById("placeBidButton");

  // Retrieve logged-in user info
  const user = localStorage.getItem("user");
  const loggedinUser = user ? JSON.parse(user) : null;

  if (!loggedinUser) {
    console.error("No user logged in, redirecting...");
    window.location.href = "screen-5.html"; // Redirect to login page
    return;
  }

  console.log("User found:", loggedinUser);
  console.log("Auction ID Retrieved:", auction.auction_id);

  // Populate auction details directly from local storage
  auctionNameElement.innerText = auction.product_name || "Loading...";
  startingPriceElement.innerText = `Starting Price: ${auction.starting_price || "Loading..."} RS`;
  auctionEndTimeElement.innerText = `Auction Ends: ${new Date(auction.end_time?.replace(" ", "T")).toLocaleString() || "Loading..."}`;
  auctionImageElement.src = auction.img_url || "default-image.png";

  // Fetch the latest bid
  async function fetchLatestBid() {
    try {
      const response = await fetch(`http://localhost:3000/latest-bid/${auction.auction_id}`);
      const data = await response.json();
      currentBidElement.innerText = `Current Bid: ${data.latest_bid} RS`;
    } catch (err) {
      console.error("Error fetching latest bid:", err);
      currentBidElement.innerText = "Current Bid: No bid yet";
    }
  }

  await fetchLatestBid(); // Fetch latest bid on page load

  // Place Bid functionality
  placeBidButton.addEventListener("click", async () => {
    const bidAmount = bidInputElement.value;    

    if (!bidAmount || bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    console.log("Placing bid with:", { auctionId: auction.auction_id, bidAmount, buyerId: loggedinUser.id });

    try {
      const response = await fetch("http://localhost:3000/place-bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "loggedinuser": JSON.stringify(loggedinUser),
        },
        body: JSON.stringify({ auction_id: auction.auction_id, bid_amount: bidAmount, buyer_id: loggedinUser.id }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        fetchLatestBid(); // Refresh bid display after successful bid
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error("Error placing bid:", err);
      alert("Failed to place bid. Please try again.");
    }
  });
});
