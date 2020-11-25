const dollarFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

// with 10% service fee
const calcServiceFee = (totalPrice) => {
    let withFee = totalPrice * 1.1;
    return withFee / 100;
};

export { dollarFormatter, calcServiceFee };
