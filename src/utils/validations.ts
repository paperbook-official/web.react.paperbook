/* eslint-disable no-useless-escape */
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
    const regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    let isRepeated = true;

    let index = 0;
    for (const digit of cpf) {
        if (index > 0 && digit !== cpf[index - 1]) {
            isRepeated = false;
            break;
        }
        index++;
    }

    if (regex.test(cpf) && !isRepeated) {
        const replacedCpf = cpf.replace(/[\.-]/g, '');
        const firstDigit = parseInt(replacedCpf[9]);
        const secondDigit = parseInt(replacedCpf[10]);

        let counter = 0;
        for (let i = 10, j = 0; i > 1; i--, j++) {
            counter += parseInt(replacedCpf[j]) * i;
        }
        counter = (counter * 10) % 11 < 10 ? (counter * 10) % 11 : 0;
        if (firstDigit !== counter) return false;

        counter = 0;
        for (let i = 11, j = 0; i > 1; i--, j++) {
            counter += parseInt(replacedCpf[j]) * i;
        }
        counter = (counter * 10) % 11 < 10 ? (counter * 10) % 11 : 0;
        if (secondDigit !== counter) return false;

        return true;
    }
    return false;
};

export const phoneValidation = (phone: string): boolean => {
    const regex = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
    return regex.test(phone);
};

export const numberValidation = (number: string): boolean => {
    const regex = /^[1-9][0-9]*$/;
    return regex.test(number);
};

export const priceValidation = (price: string): boolean => {
    const regex = /^\d+(,\d{1,2})?$/;
    return regex.test(price);
};

export const percentageValidation = (percentage: string): boolean => {
    const regex = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/g;
    return regex.test(percentage);
};
