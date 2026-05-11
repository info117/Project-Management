/**
 * Subscription and Trial utility functions
 */

export const TRIAL_DAYS = 7;

export function getTrialStatus(createdAt: string | undefined, subscriptionStatus: string | undefined) {
  if (subscriptionStatus === 'active') {
    return { isExpired: false, isTrial: false, daysLeft: 0 };
  }

  if (!createdAt) {
    return { isExpired: false, isTrial: true, daysLeft: TRIAL_DAYS };
  }

  const createdTime = new Date(createdAt).getTime();
  const now = new Date().getTime();
  const expiryTime = createdTime + TRIAL_DAYS * 24 * 60 * 60 * 1000;
  
  const diff = expiryTime - now;
  const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  
  return {
    isExpired: diff <= 0,
    isTrial: true,
    daysLeft
  };
}
