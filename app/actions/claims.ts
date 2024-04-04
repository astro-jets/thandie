"use server";

type claimProps = {
  _id: string;
  name: string;
  price: string;
  status: string;
  list: string[];
}[];

export const newclaim = async (formData: {}): Promise<
  | {
      message: string;
      status: string;
    }
  | any
> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/claims/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(formData),
    });
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getclaims = async (): Promise<{ claims: claimProps } | any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/claims/allClaims/`,
      {
        next: { revalidate: 0 },
      }
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getSingleClaim = async (
  claim: string
): Promise<{ claims: claimProps } | any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/claims/single/?claim=${claim}`,
      {
        next: { revalidate: 0 },
      }
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getclaimsByUser = async (
  id: string
): Promise<{ claims: claimProps } | any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/claims/all/?user=${id}`,
      {
        next: { revalidate: 0 },
      }
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const updateClaim = async (
  claim: string,
  status: string
): Promise<{ message: string }> => {
  const response = await fetch(
    `${process.env.ROOT_LINK}/api/claims/update/?claim=${claim}&status=${status}`,
    {
      method: "PATCH",
      next: { revalidate: 0 },
    }
  );
  const res = await response.json();
  console.log("Response => ", res);
  return res;
};

export const deleteClaim = async (
  claim: string,
  status: string
): Promise<{ message: string }> => {
  const response = await fetch(
    `${process.env.ROOT_LINK}/api/claims/delete/?claim=${claim}&status=${status}`,
    {
      method: "DELETE",
      next: { revalidate: 0 },
    }
  );
  const res = await response.json();
  console.log("Response => ", res);
  return res;
};
