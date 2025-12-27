export type FormatGeneralOptions = {
    numericOnly?: boolean;
    alphaNumericOnly?: boolean;
    uppercase?: boolean;
    maxLength?: number;
    phone?: boolean;
    card?: boolean;
};

export const formatGeneral = (
    value: string,
    options: FormatGeneralOptions,
): string => {
    let formattedValue = value;

    if (options.numericOnly) {
        formattedValue = formattedValue.replace(/\D/g, '');
    }

    if (options.alphaNumericOnly) {
        formattedValue = formattedValue.replace(/[^a-zA-Z0-9]/g, '');
    }

    if (options.uppercase) {
        formattedValue = formattedValue.toUpperCase();
    }

    if (options.phone) {
        formattedValue = formattedValue.replace(/\D/g, '').slice(0, 10);
        if (formattedValue.length > 5) {
            formattedValue = `${formattedValue.slice(0, 5)} ${formattedValue.slice(5)}`;
        }
    }

    if (options.card) {
        formattedValue = formattedValue
            .replace(/\D/g, '')
            .slice(0, 16)
            .replace(/(.{4})/g, '$1 ')
            .trim();
    }

    if (options.maxLength) {
        formattedValue = formattedValue.slice(0, options.maxLength);
    }

    return formattedValue;
};
