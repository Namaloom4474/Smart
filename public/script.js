async function calculateSalary() {
  const salesInput = document
    .getElementById("salesInput")
    .value.trim()
    .replace(/\s+/g, " ");

  try {
    const response = await fetch("/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `salesInput=${salesInput}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    document.getElementById(
      "result"
    ).innerHTML = `Total Sales $${result.y}<br>Total Commission Earned: Rs. ${result.totalCommission}`;
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}
document
  .getElementById("salesInput")
  .addEventListener("paste", function (event) {
    event.preventDefault();

    var pastedText = (event.clipboardData || window.clipboardData).getData(
      "text"
    );
    pastedText = pastedText.replace(/\s+/g, " ").trim();

    document.getElementById("salesInput").value = pastedText;
  });
