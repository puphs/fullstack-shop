type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<
	T extends { [key: string]: (...args: Array<any>) => any }
> = ReturnType<PropertiesTypes<T>>;
