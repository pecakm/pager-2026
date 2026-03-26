export type CreateUserInput = {
  email: string;
  password: string;
};

export type CreateUserResult =
  | { success: true }
  | { success: false; error: string; status: 400 | 409 | 500 };
