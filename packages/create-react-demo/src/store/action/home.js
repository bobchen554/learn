const HOME_ADD_COUNT = 'HOME_ADD_COUNT'

function addCount(data) {
    return {
        type: HOME_ADD_COUNT,
        data,
    }
}

export {
    HOME_ADD_COUNT,
    addCount
}