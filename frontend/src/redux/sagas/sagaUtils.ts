import axios from 'axios';

export const getErrorMessage = (err: any): string => {
	if (axios.isAxiosError(err)) {
		console.log({ err });
		if (err.response?.data.message) {
			return err.response.data.message;
		}
		return err.message;
	}
	return 'Something went wrong';
};
