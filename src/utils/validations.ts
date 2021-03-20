export const emailValidation = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const passwordValidation = (password: string): boolean => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
};

export const nameValidation = (name: string): boolean => {
    const regex = /^([a-zA-Z]{1,}'?-?([a-zA-Z]{1,})?)/;
    return regex.test(name);
};

export const cepValidation = (cep: string): boolean => {
    const regex = /[0-9]{8}/g;
    return regex.test(cep);
};
