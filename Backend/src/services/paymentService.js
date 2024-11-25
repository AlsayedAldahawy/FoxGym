import paymentModel from '../models/paymentModel.js';


export const getAllPayment = async() => {
    return await paymentModel.find()
}

export const seedInitialPayment = async () => {
    const payment = [
      {
        id: "1",
        paymentName: "Lifting",
        price: 250,
      },
      {
        id: "2",
        paymentName: "Lifting + Treadmill",
        price: 300,
      },
      {
        id: "3",
        paymentName: "Cross Fit",
        price: 250,
      },
      {
        id: "4",
        paymentName: "Mixed",
        price: 400,
      },
    ];


    const existedPayment = await getAllPayment();
        if (existedPayment.length === 0) {
            await paymentModel.insertMany(payment)
        }
}
