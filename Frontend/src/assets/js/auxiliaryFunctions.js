function idGenerator(name, gender) {


    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // monthely dependent character calculation
    let date = new Date()
    let month = date.getMonth()    
    let janJam = (month) ? 1 : 3;
    let monthChar = chars[randomNumberRange(0, janJam) + (month * 2) + 3 - janJam]


    // Yearly dependant character
    let yearChar = chars[date.getFullYear() % 26];


    // Male/Female-Odd/Even dependent character calculation
    const eo = name.length % 2;
    const mf = (gender.toUpperCase() != "MALE");

    /**
     * dividing the letters to 2 sections:
     * 0 - 21 for male members
     * 22 - 35 for female members
     * with ration 11:7 in favor for male members as they are the majority of the gym goers.
     * 
     * then dividing each section to two more sections based on the name length if it even or odd.
     */

    let MFEOChar = chars[randomNumberRange(0 + (mf * 21) + (eo * (10 - (3 * mf))), 35 - (!mf * 14) - (!eo * (10 - (3 * mf))))]


    // Testing the ranges value
    // for (let mf = 0; mf <= 1; mf++) {

    //     for (let eo = 0; eo <= 1; eo++) {
    //         console.log("range", 0 + (mf * 22) + (eo * (11 - (4 * mf))), 35 - (!mf * 14) - (!eo * (11 - (4 * mf))))
    //     }

    // }

    // testing monthely dependent character
    /*
        for (let month = 0; month <= 11; month++) {

            let janJam = (month) ? 1 : 3;

            for (let index = 0; index <= janJam; index++) {
                let monthChar = letters[index + (month * 2) + 3 - janJam]
                console.log(month, monthChar)

            }
        }
    */

    let uid = yearChar + monthChar + MFEOChar;
    return (uid);
}




function randomNumberRange(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;

}

console.log("m-o", idGenerator("ahmed mohamed tarek", "male"))
console.log("m-e", idGenerator("Khalid mohamed tarek", "male"))
console.log("f-o", idGenerator("Faiza tarek", "fale"))
console.log("f-e", idGenerator("Faiza tareki", "female"))
