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

export const cpfValidation = (cpf: string): boolean => {
    // eslint-disable-next-line no-useless-escape
    const regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    return regex.test(cpf);
};

export const phoneValidation = (phone: string): boolean => {
    const regex = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
    return regex.test(phone);
};

export const numberValidation = (number: string): boolean => {
    const regex = /^[1-9][0-9]*$/;
    return regex.test(number);
};
