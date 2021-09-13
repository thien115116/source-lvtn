const config = {
    auth: {
        user: "developer.lxh@gmail.com",
        pass: "11225858692548"
    },
    mailPort : 587,
    mailHost : "smtp.gmail.com",
}

const mailtrap = {
    authMailtrap: {
        user: "094ab457dca29e",
        pass: "37b70c198da506"
    },
    mailPortMailtrap : 465,
    mailHostMailtrap : "smtp.mailtrap.io",
}

module.exports ={
    ...mailtrap
}

module.exports = {
    ...config
}