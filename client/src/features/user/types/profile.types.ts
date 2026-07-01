export interface UserProfile {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverImage: string;
  watchHistory: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  fullname: string;
  email: string;
}

export interface UpdateAvatarPayload {
  avatar: File;
}

export interface UpdateCoverPayload {
  coverImage: File;
}


// Setting types

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}