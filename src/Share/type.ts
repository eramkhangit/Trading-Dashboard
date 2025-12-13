export interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
  };
  contact: {
    phone: number;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    emergency: {
      name: string;
      relationship: string;
      phone: number;
    };
  };
  employment: {
    company: string;
    position: string;
    startDate: Date;
    salary: {
      amount: number;
      currency: string;
      bonus: number;
    };
  };
  preferences: {
    theme: string;
    language: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
}