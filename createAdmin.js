const Admin = require("./userModel")
const bcrypt = require("bcryptjs");

export const defaultAdmin = async() => {

    const data = {
        name: "Amfi admin",
        location: "Abuja",
        email: "admin@amfinetwork.com",
        password: "justin1234"
    }

    const admin = await Admin.findOne({ email: data.email });
            if (admin) {
                console.log("Default admin already added")
                return;
            }else {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(data.password, salt);

                await Admin.create({...data, password:hash})
                
                console.log("Admin created")
            }
}