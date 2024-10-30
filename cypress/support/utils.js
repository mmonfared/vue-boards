export function generateRandomIdentity () {
    let uid = Cypress._.random(0, 1e5)
    return {"email": `user${uid}@boards.net`, "password": `Pass@${uid}`}
}
