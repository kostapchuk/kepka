export const random = (input) => {
    return input[Math.floor((Math.random() * input.length))];
}

export const randomIndex = (input) => {
    return Math.floor((Math.random() * input.length));
}

export const shuffle = (input) => {
    const output = [...input];
    for (let i = output.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [output[i], output[j]] = [output[j], output[i]];
    }
    return output;
}

export const distinct = (input) => {
    return [...new Set(input)];
}
