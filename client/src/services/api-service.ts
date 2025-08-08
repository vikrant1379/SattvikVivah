export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  const response = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response;
}

export async function fetchSpiritualPractices(): Promise<string[]> {
  const response = await apiRequest("GET", "/api/spiritual-practices");
  const data = await response.json();
  return data.practices;
}

export async function fetchSacredTexts(): Promise<string[]> {
  const response = await apiRequest("GET", "/api/sacred-texts");
  const data = await response.json();
  return data.texts;
}

export async function fetchStates(): Promise<string[]> {
  const response = await apiRequest("GET", "/api/states");
  const data = await response.json();
  return data.states;
}

export async function fetchLanguages(): Promise<string[]> {
  const response = await apiRequest("GET", "/api/languages");
  const data = await response.json();
  return data.languages;
}
