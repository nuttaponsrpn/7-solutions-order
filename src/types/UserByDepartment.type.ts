export type GroupByDepartment = {
  [department: string]: Department;
};

type Department = {
  male: number;
  female: number;
  ageRange: string;
  hair: Hair;
  addressUser: AddressUser;
};

type AddressUser = {
  [username: string]: string; // User's name to their address
};

export type Hair = {
  [color: string]: number;
};
