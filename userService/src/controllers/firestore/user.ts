import { userCollection } from "@/controllers/firestore";
import {
  addSingleItem,
  getSingleItem
} from "@/controllers/firestore/firestore";
import { IProfile } from "@/models/google.profile";
import { DocumentReference } from "@google-cloud/firestore";

export const deleteUser = async (id: string) => {
  const querySnapshot = await userCollection.where("id", "==", id).get();
  if (querySnapshot.docs[0]) querySnapshot.docs[0].ref.delete();
};

export const getUser = async (id: string): Promise<IProfile | undefined> => {
  const querySnapshot = await userCollection.where("id", "==", id).get();
  return getSingleItem<IProfile>(querySnapshot);
};

export const doSingUpOrLogin = async (
  profile: IProfile
): Promise<DocumentReference | IProfile> => {
  const userInfo = await getUser(profile.id);
  if (userInfo) {
    return userInfo;
  } else {
    const { id, displayName, name, provider } = profile;
    return addSingleItem({ id, displayName, name, provider });
  }
};
