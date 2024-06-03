export function addAuthHeader(otherHeaders = {}) {
  const token = localStorage.getItem("authToken");

  if (!token || token === "INVALID_TOKEN") {
    return otherHeaders;
  } else {
    return {
      ...otherHeaders,
      Authorization: `Bearer ${token}`
    };
  }
}
