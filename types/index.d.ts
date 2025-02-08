/* eslint-disable no-unused-vars */

declare interface SignInProps {
  email: string;
  password: string;
}

declare interface CreateUserProps {
  email: string;
  username: string;
  mobileNumber: string;
  password: string;
}

declare interface UpdateUserImageProps {
  userId: string;
  avatar: any;
  avatarId?: string;
}

declare interface UpdateUserProps {
  userId: string;
  name: string;
  username: string;
  gender: string;
  country: string;
}

declare interface UserDetailsProps {
  $id: string;
  accountId: string;
  email: string;
  username: string;
  mobileNumber: string;
  name: string | null;
  gender: string | null;
  country: string | null;
  avatar: string | null;
  avatarId: string | null;
  $createdAt: string;
  $updatedAt: string;
}

declare interface CreateFolderProps {
  name: string;
  tags: string[];
}

declare type FileType = "document" | "image" | "video" | "audio" | "other";

declare interface GetFilesProps {
  types: string[];
  searchText?: string;
  sort?: string;
  limit: number;
  root?: boolean;
  page: number;
}

declare interface GetFoldersProps {
  page: number;
  limit: number;
}

declare interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
}
