import packagesModel from '../models/packagesModel.js';


export const getAllPackages = async() => {
    return await packagesModel.find()
}

export const seedInitialPackages = async () => {
    const packages = [
      {
        id: "1",
        packageName: "year",
        numberOfDays: 365,
      },
      {
        id: "2",
        packageName: "half-year",
        numberOfDays: 183,
      },
      {
        id: "3",
        packageName: "quarter-year",
        numberOfDays: 91,
      },
      {
        id: "4",
        packageName: "month",
        numberOfDays: 30,
      },
      {
        id: "5",
        packageName: "half-month",
        numberOfDays: 30,
      },
    ];


    const existedPackages = await getAllPackages();
        if (existedPackages.length === 0) {
            await packagesModel.insertMany(packages)
        }
}