

export const generateCode = (value) => {
    let output = '';
    value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").split(' ').forEach(item => {
        output += item.charAt(1) + item.charAt(0);
    }) //join('') de noi mang vua cat ''
    return output.toUpperCase() + value.length;
}

// console.log(generateCode("Xin chào Việt nam"))