

export const removeDuplicates = (array) =>{
    var hash = {};
    return array.filter(o => hash[o.userId] ? false : hash[o.userId] = true);
}
