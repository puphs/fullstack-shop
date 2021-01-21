export type Validator = (value: string) => string | undefined;

export const composeValidators = (...validators: Array<Validator>): Validator => {
	return (value) => {
		return validators.reduce<string | undefined>(
			(error, validator) => error || validator(value),
			undefined
		);
	};
};

export const createRequireValidator = (error: string): Validator => {
	return (value) => (value ? undefined : error);
};

export const createMaxLengthValidator = (error: string, maxLength: number): Validator => {
	return (value) => (value.length <= maxLength ? undefined : error);
};

export const createMinLengthValidator = (error: string, minLength: number): Validator => {
	return (value) => (value.length >= minLength ? undefined : error);
};

const emailRegExp = new RegExp(
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);

export const createEmailValidator = (error: string): Validator => {
	return (value) => {
		return emailRegExp.test(value) ? undefined : error;
	};
};
