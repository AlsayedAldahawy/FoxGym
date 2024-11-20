import packagesModel from '../models/packagesModel.js';


export const getAllPackages = async() => {
    return await packagesModel.find()
}

export const seedInitialPackages = async () => {
    const packages = [
      {
        id: "1",
        packageName: "Annual",
        numberOfDays: 365,
      },
      {
        id: "2",
        packageName: "Semi-annual",
        numberOfDays: 183,
      },
      {
        id: "3",
        packageName: "Quarterly",
        numberOfDays: 91,
      },
      {
        id: "4",
        packageName: "Monthly",
        numberOfDays: 30,
      },
      {
        id: "5",
        packageName: "Semi-monthly",
        numberOfDays: 30,
      },
    ];


    const existedPackages = await getAllPackages();
        if (existedPackages.length === 0) {
            await packagesModel.insertMany(packages)
        }
}
