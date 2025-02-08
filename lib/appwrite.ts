import {
  Account,
  Client,
  Databases,
  Storage,
  Query,
  ID,
} from "react-native-appwrite";

import {
  APPWRITE_DATABASE_ID,
  APPWRITE_ENDPOINT,
  APPWRITE_PLATFORM,
  APPWRITE_PROJECT_ID,
  APPWRITE_STORAGE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_FOLDER_COLLECTION_ID,
  APPWRITE_FILE_COLLECTION_ID,
} from "./config";
import {constructFileUrl, getFileType} from "./utils";

const appwriteConfig = {
  endpoint: APPWRITE_ENDPOINT,
  platform: APPWRITE_PLATFORM,
  projectId: APPWRITE_PROJECT_ID,
  databaseId: APPWRITE_DATABASE_ID,
  storageId: APPWRITE_STORAGE_ID,
  userCollectionId: APPWRITE_USER_COLLECTION_ID,
  folderCollectionId: APPWRITE_FOLDER_COLLECTION_ID,
  fileCollectionId: APPWRITE_FILE_COLLECTION_ID,
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

export const signIn = async ({email, password}: SignInProps) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createUser = async ({
  email,
  username,
  mobileNumber,
  password,
}: CreateUserProps) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    await signIn({email, password});

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username: username.toLowerCase(),
        mobileNumber,
      }
    );

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    return null;
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUserImage = async ({
  userId,
  avatar,
  avatarId,
}: UpdateUserImageProps) => {
  try {
    if (avatarId) {
      await storage.deleteFile(appwriteConfig.storageId, avatarId);
    }

    const {mimeType, fileName, fileSize, height, uri, width} = avatar;
    const asset = {
      type: mimeType,
      name: fileName,
      size: fileSize,
      height,
      uri,
      width,
    };

    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await storage.getFilePreview(
      appwriteConfig.storageId,
      uploadedFile.$id,
      2000,
      2000
      // "top",
      // 100
    );

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        avatar: fileUrl,
        avatarId: uploadedFile.$id,
      }
    );

    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUser = async ({
  userId,
  name,
  username,
  gender,
  country,
}: UpdateUserProps) => {
  try {
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        name: name.toLowerCase(),
        username: username.toLowerCase(),
        gender,
        country: country.toLowerCase(),
      }
    );

    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createFolder = async ({name, tags}: CreateFolderProps) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const newFolder = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.folderCollectionId,
      ID.unique(),
      {
        name: name.toLowerCase(),
        tags,
        user: currentUser.$id,
      }
    );

    return newFolder;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFolders = async ({page, limit}: GetFoldersProps) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const queries = [Query.equal("user", [currentUser.$id])];
    queries.push(Query.orderAsc("$createdAt"));
    queries.push(Query.limit(limit));
    queries.push(Query.offset((page - 1) * limit));

    const folders = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.folderCollectionId,
      queries
    );

    return {
      folders: folders.documents,
      total: folders.total,
      hasMore: folders.documents.length === limit,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFolder = async ({id}: {id: string}) => {
  try {
    const folder = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.folderCollectionId,
      id
    );

    return folder;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateFolder = async ({
  id,
  name,
  tags,
}: {
  id: string;
  name: string;
  tags: string[];
}) => {
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.folderCollectionId,
      id,
      {name: name.toLowerCase(), tags}
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteFolder = async ({id}: {id: string}) => {
  try {
    const folder = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.folderCollectionId,
      id
    );

    await Promise.all(
      folder.files.map(async (file: any) => {
        await storage.deleteFile(appwriteConfig.storageId, file.fileId);

        await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.fileCollectionId,
          file.$id
        );
      })
    );

    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.folderCollectionId,
      id
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

export const uploadFiles = async ({
  files,
  folder,
}: {
  files: any[];
  folder?: string | null;
}) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    await Promise.all(
      files.map(async (file) => {
        const asset = {type: file.mimeType, ...file};

        const bucketFile = await storage.createFile(
          appwriteConfig.storageId,
          ID.unique(),
          asset
        );

        const fileDocument = {
          name: bucketFile.name,
          type: getFileType(bucketFile.name).type,
          size: bucketFile.sizeOriginal,
          url: constructFileUrl(bucketFile.$id),
          extension: getFileType(bucketFile.name).extension,
          owner: currentUser.$id,
          folder,
          fileId: bucketFile.$id,
        };

        await databases
          .createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.fileCollectionId,
            ID.unique(),
            fileDocument
          )
          .catch(async () => {
            await storage.deleteFile(appwriteConfig.storageId, bucketFile.$id);
          });
      })
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFiles = async ({
  types = [],
  searchText = "",
  sort = "$createdAt-desc",
  limit,
  root = false,
  page,
}: GetFilesProps) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const queries = [Query.equal("owner", [currentUser.$id])];
    if (types.length > 0) queries.push(Query.equal("type", types));
    if (searchText) queries.push(Query.search("name", searchText));
    if (sort) {
      const [sortBy, orderBy] = sort.split("-");

      queries.push(
        orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy)
      );
    }
    if (root) queries.push(Query.isNull("folder"));
    queries.push(Query.limit(limit));
    queries.push(Query.offset((page - 1) * limit));

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.fileCollectionId,
      queries
    );

    return {
      files: files.documents,
      total: files.total,
      hasMore: files.documents.length === limit,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFile = async ({id}: {id: string}) => {
  try {
    const file = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileCollectionId,
      id
    );

    return file;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateFile = async ({
  id,
  name,
  extension,
}: {
  id: string;
  name: string;
  extension: string;
}) => {
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileCollectionId,
      id,
      {name: name.toLowerCase() + "." + extension}
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteFile = async ({
  id,
  fileId,
}: {
  id: string;
  fileId: string;
}) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileCollectionId,
      id
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function getTotalSpaceUsed() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.fileCollectionId,
      [Query.equal("owner", [currentUser.$id])]
    );

    const totalSpace = {
      image: {size: 0, latestDate: ""},
      document: {size: 0, latestDate: ""},
      video: {size: 0, latestDate: ""},
      audio: {size: 0, latestDate: ""},
      other: {size: 0, latestDate: ""},
      used: 0,
      all: 2 * 1024 * 1024 * 1024,
    };

    files.documents.forEach((file) => {
      const fileType = file.type as FileType;
      totalSpace[fileType].size += file.size;
      totalSpace.used += file.size;

      if (
        !totalSpace[fileType].latestDate ||
        new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
      ) {
        totalSpace[fileType].latestDate = file.$updatedAt;
      }
    });

    return totalSpace;
  } catch (error: any) {
    throw new Error(error);
  }
}
