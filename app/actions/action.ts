"use server";

type statsType = {
  stats: {
    claims: string;
    subscriptions: string;
    payments: string;
  };
};

export const getStats = async (
  user: string
): Promise<{ stats: statsType } | any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/clientStats/?user=${user}`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getTransData = async (
  user: string
): Promise<{ stats: statsType } | any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/charts/claims/?user=${user}`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getPaymentsData = async (
  user: string
): Promise<{ stats: statsType } | any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/charts/payments/?user=${user}`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getNotifications = async (
  user: string
): Promise<{ stats: statsType } | any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/notifications/?user=${user}`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const readNotifications = async (
  user: string
): Promise<{ stats: statsType } | any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/readNotification/?notification=${user}`,
      {
        method: "PATCH",
        next: { revalidate: 0 },
      }
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const searchService = async (query: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/services/search/?query=${query}`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
