const dollarFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

// with 10% service fee
const calcTotalWithFee = (totalPrice) => {
    let withFee = totalPrice * 1.1;
    return withFee / 100;
};

const calcServiceFee = (totalPrice) => {
    let fee = totalPrice * 0.1;
    return fee / 100;
};

export { dollarFormatter, calcTotalWithFee, calcServiceFee };
