import * as functions from 'firebase-functions';
import { db } from '../index';

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user;

  await db.collection('users').doc(uid).set({
    id: uid,
    email: email ?? '',
    displayName: displayName ?? '',
    firstName: '',
    lastName: '',
    photoUrl: photoURL ?? '',
    roles: ['customer'],
    primaryRole: 'customer',
    authProvider: user.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
    isActive: true,
    isVerified: !!user.emailVerified,
    createdAt: new Date(),
    updatedAt: new Date(),
    fcmTokens: [],
    preferences: {
      language: 'en',
      currency: 'USD',
      pushNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
      darkMode: false,
    },
  });

  functions.logger.info(`User profile created for ${uid}`);
});

export const onUserDeleted = functions.auth.user().onDelete(async (user) => {
  const { uid } = user;

  await db.collection('users').doc(uid).update({
    isActive: false,
    updatedAt: new Date(),
  });

  functions.logger.info(`User ${uid} marked as inactive`);
});
