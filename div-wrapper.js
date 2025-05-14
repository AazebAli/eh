document.addEventListener("DOMContentLoaded", () => {
    const confirmButton = document.getElementById("confirmButton");
    const otpInput = document.getElementById("otpInput");

    if (!confirmButton || !otpInput) {
        console.error("Required elements not found in the DOM.");
        return;
    }

    const selectedBid = localStorage.getItem("selectedBid");

    if (!selectedBid) {
        document.body.innerHTML = "<p>Error: No bid data found.</p>";
        return;
    }

    let bid;
    try {
        bid = JSON.parse(selectedBid);
    } catch (error) {
        console.error("Error parsing bid data:", error);
        document.body.innerHTML = "<p>Error: Invalid bid data.</p>";
        return;
    }

    // Ensure all required bid properties exist
    // if (!bid || !bid.auction_id || !bid.product_name || !bid.bid_amount || !bid.img_url) {
    //     document.body.innerHTML = "<p>Error: Incomplete bid data.</p>";
    //     return;
    // }

    // Populate bid details
    document.getElementById("productName").textContent = bid.product_name;
    document.getElementById("bidAmount").textContent = `Amount: ${bid.bid_amount} RS`;
    document.getElementById("auctionImage").src = bid.img_url;
    document.getElementById("auctionImage").alt = bid.product_name;
    document.getElementById("auctionStatus").textContent = "Auction Ended";

    // Retrieve logged-in user info
    const user = localStorage.getItem("user");
    const loggedinUser = user ? JSON.parse(user) : null;

    if (!loggedinUser || !loggedinUser.id) {
        console.error("No user logged in, redirecting...");
        window.location.href = "screen-5.html"; // Redirect to login page
        return;
    }

    confirmButton.addEventListener("click", async () => {
        const otpValue = otpInput.value.trim();

        if (!otpValue) {
            alert("Please enter a valid OTP before confirming payment.");
            return;
        }

        try {
            console.log("Submitting payment with:", bid); // Debugging step

            const response = await fetch("http://localhost:3000/confirm-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    auction_id: bid.auction_id,
                    buyer_id: loggedinUser.id,
                    amount: bid.bid_amount,
                    otp: otpValue // Ensure OTP is sent
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Show success or failure message
                localStorage.removeItem("selectedBid"); // Clear bid info after success
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Failed to process payment. Please try again.");
        }
    });
});
