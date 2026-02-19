
const sesstionIdToUserIdMap = new Map();

function setUser(id, user) {
    sesstionIdToUserIdMap.set(id, user);
}

function getUser(id) {
    return sesstionIdToUserIdMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}
