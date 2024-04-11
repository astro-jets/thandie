"use server";

type statsType = {
  stats: {
    claims: string;
    subscriptions: string;
    payments: string;
  };
};

// Admin Actions
export const getAdminStats = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/adminStats/`
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

export const getAdminTransData = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/charts/claims`
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

export const getAdminPaymentsData = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/charts/payments/`
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

export const getAdminSubscriptions = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/subscriptions/admin/`
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

export const getCustomers = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/customers`
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

// User Actions
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
      `${process.env.ROOT_LINK}/api/actions/charts/customerClaims/?user=${user}`
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
      `${process.env.ROOT_LINK}/api/actions/charts/customerPayments/?user=${user}`
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
      `${process.env.ROOT_LINK}/api/services/search/?query=${query}`,
      {
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
