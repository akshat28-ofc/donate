document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const donationCard = document.querySelector('.donation-card');
  const paymentSection = document.getElementById('paymentSection');
  const thankYouMessage = document.getElementById('thankYouMessage');
  const amountButtons = document.querySelectorAll('.amount-btn');
  const customAmountContainer = document.getElementById('customAmountContainer');
  const customAmountInput = document.getElementById('customAmount');
  const donateBtn = document.getElementById('donateBtn');
  const backBtn = document.getElementById('backBtn');
  const qrCode = document.getElementById('qrCode');

  let selectedAmount = 0;
  let paymentLink = ""; // Store the selected payment link

  // Disable donate button until user selects an amount
  donateBtn.disabled = true;
  donateBtn.style.opacity = "0.5"; // Make button appear disabled

  // Show payment section when donation card is clicked
  donationCard.addEventListener('click', function () {
    paymentSection.style.display = 'block';
  });

  // Handle amount button selection
  amountButtons.forEach(button => {
    button.addEventListener('click', function () {
      const amount = this.getAttribute('data-amount');

      // Remove active class from all buttons
      amountButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      if (amount === 'custom') {
        customAmountContainer.style.display = 'block';
        customAmountInput.focus();
        selectedAmount = 0;
      } else {
        customAmountContainer.style.display = 'none';
        selectedAmount = parseInt(amount);
        paymentLink = `upi://pay?pa=krishnanshbhardwaj07@okhdfcbank&pn=KRISHNANSH SO KRISHAN SHARMA&am=${selectedAmount}&cu=INR`;
        generateQRCode(paymentLink);
      }

      // Enable donate button once a selection is made
      donateBtn.disabled = false;
      donateBtn.style.opacity = "1";
    });
  });

  // Handle custom amount input
  customAmountInput.addEventListener('input', function () {
    selectedAmount = parseInt(this.value) || 0;
    
    if (selectedAmount > 0) {
      // Generate UPI payment link dynamically
      paymentLink = `upi://pay?pa=krishnanshbhardwaj07@okhdfcbank&pn=KRISHNANSH SO KRISHAN SHARMA&am=${selectedAmount}&cu=INR`;
      generateQRCode(paymentLink);

      // Enable donate button
      donateBtn.disabled = false;
      donateBtn.style.opacity = "1";
    } else {
      donateBtn.disabled = true;
      donateBtn.style.opacity = "0.5";
    }
  });

  // Handle donation button click
  donateBtn.addEventListener('click', function () {
    if (!paymentLink) {
      alert('Please select or enter a valid amount');
      return;
    }

    window.location.href = paymentLink;
  });

  // Handle back button click
  backBtn.addEventListener('click', function () {
    thankYouMessage.style.display = 'none';
    paymentSection.style.display = 'block';
  });

  // Function to generate a QR code dynamically
  function generateQRCode(link) {
    qrCode.innerHTML = `
      <div style="text-align: center;">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link)}" alt="QR Code">
      </div>
    `;
  }
});
